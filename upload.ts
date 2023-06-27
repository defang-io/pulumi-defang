import * as fs from "fs";
import { mkdtemp, rm, stat } from "fs/promises";
import { tmpdir } from "os";
import { basename, join } from "path";
import { pipeline } from "stream/promises";
import * as tar from "tar";

const extractMessageRegex = /<Message>(.*?)<\/Message>/;

function filter(path: string): boolean {
  switch (basename(path)) {
    case ".direnv":
    case ".envrc":
    case ".git":
    case ".github":
    case ".idea":
    case ".vscode":
    case "__pycache__":
    case "docker-compose.yml":
    case "docker-compose.yaml":
      // case "node_modules":
      return false; // omit
  }
  return true;
}

export async function uploadTarball(
  putUrl: string,
  cwd: string
): Promise<void> {
  const tempdir = await mkdtemp(join(tmpdir(), "defang-build-"));
  const temppath = join(tempdir, "context.tar.gz");
  console.debug(`Creating tarball in ${temppath}`);

  try {
    // Using stream.pipeline() instead of .pipe() to correctly handle errors
    await pipeline(
      tar.create({ cwd, filter, gzip: true, portable: true, strict: true }, [
        ".",
      ]),
      fs.createWriteStream(temppath)
    );

    const contentLength = (await stat(temppath)).size;
    const fetch = (await import("node-fetch")).default; // ESM
    const res = await fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Length": `${contentLength}`, // required by S3 presigned URLs
        "Content-Type": "application/gzip",
      },
      body: fs.createReadStream(temppath),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      // console.debug(errorBody); TODO: check debug flag
      const message = errorBody.match(extractMessageRegex)?.[1];
      throw new Error(
        `Failed to upload build context: ${message || res.statusText}`
      );
    }
  } finally {
    await rm(tempdir, { recursive: true });
  }
}
