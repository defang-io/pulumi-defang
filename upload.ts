import { basename } from "path";
import * as tar from "tar";

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
  context: string
): Promise<void> {
  const tgz = tar.create({ cwd: context, gzip: true, portable: true, filter }, [
    ".",
  ]);
  const fetch = (await import("node-fetch")).default;
  const req = await fetch(putUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/gzip",
    },
    body: tgz,
  });
  if (!req.ok) {
    throw new Error(`Failed to upload build context: ${req.statusText}`);
  }
}
