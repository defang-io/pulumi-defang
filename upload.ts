import { createReadStream, createWriteStream, promises } from "fs";
import { tmpdir } from "os";
import { basename, join } from "path";
import { promises as stream } from "stream";
import * as tar from "tar";

const extractMessageRegex = /<Message>(.*?)<\/Message>/;

function filter(path: string): boolean {
  // TODO: use .dockerignore
  switch (basename(path)) {
    case ".DS_Store":
    case ".direnv":
    case ".envrc":
    case ".git":
    case ".github":
    case ".idea":
    case ".vscode":
    case "__pycache__":
    case "defang": // our binary
    case "defang.exe": // our binary
    case "docker-compose.yml":
    case "docker-compose.yaml":
    case "node_modules":
      return false; // omit
  }
  return true; // keep
}

export async function createTarball(cwd: string): Promise<string> {
  const tempdir = await promises.mkdtemp(join(tmpdir(), "defang-build-"));
  console.debug(`Using temporary folder ${tempdir}`);
  const temppath = join(tempdir, "context.tar.gz");

  // Using stream.pipeline() instead of .pipe() to correctly handle errors
  await stream.pipeline(
    tar.create(
      {
        cwd,
        filter,
        gzip: true,
        mtime: new Date(315532800*1000), // 1980-01-01 00:00:00 GMT same as Nix
        portable: true,
        strict: true,
      } as any, // cast needed for mtime (bug in tar type definitions)
      ["."]
    ),
    createWriteStream(temppath)
  );
  return temppath;
}

export async function uploadTarball(
  putUrl: string,
  temppath: string
): Promise<void> {
  const contentLength = (await promises.stat(temppath)).size;
  const fetch = (await import("node-fetch")).default; // ESM
  const res = await fetch(putUrl, {
    method: "PUT",
    headers: {
      "Content-Length": `${contentLength}`, // required by S3 presigned URLs
      "Content-Type": "application/gzip",
    },
    body: createReadStream(temppath),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    // console.debug(errorBody); TODO: check debug flag
    const message = errorBody.match(extractMessageRegex)?.[1];
    throw new Error(
      `Failed to upload build context: ${message || res.statusText}`
    );
  }
}
