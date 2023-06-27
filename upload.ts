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
  const tgz = tar.create({ cwd: context, gzip: true }, [
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
    console.debug(await req.text());
    throw new Error(`Failed to upload build context: ${req.statusText}`);
  }
}

uploadTarball("https://ecs-prod1-build-bucket.s3.us-west-2.amazonaws.com/builds/dc7d22b0-c931-4478-bdf8-a7f871775249?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6O25XYKX6LI5KYFQ%2F20230627%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230627T200545Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAgpfvrRthm2Q8wbZhd1qvGjCP3i0ChmDFKGkJT7ZDvFAiEA7rpkud15zbvvD6VC45lKo8neDoGuAGw4Dm77iBCC0KYq%2BQMIYhAAGgw5OTM5NDQ2NTA0MTUiDCSJ2fFxDbYfSXkc5yrWA7MsZvCCNUmKY3DWVM2N2AFMbDy%2BKJbxLO12QT2VKHSNp6bHQriNE7MuBUczCFFFTKMtVuXIwnOLRZ2o8Sgex4nIl%2B55ntDWmEfTAnF8M7fRF%2FGnVBMICZtNUeyLdtkJIGYHBVFMrejLY7oIAqJc3iELMxaiY77efYRAAi2cndNKhCIcH6cfSjnitYDh%2B0Yv52W8spwr%2BUozzBpMhFRgfHBJkHU4sMWA5H0m1NCzBeBsoR9jYK5SBkfkASYhv1fSRH0TfCEhI9JRWJLOOaWO6vNPHnzB5HZmZrEnUz2q6SpCLiB5gozfa26Ulpm4aWuHsOcwmuVRLnBekLzX9HHGr7Xxzy8X3%2F3QzLqq6vBQEdWxYotL5zY22PqDCrSOBD7QAeNR%2BARt%2F2TgQQCnbx%2F1Ob6SNIllAyxf9MA79YkHtLu6gEBPrRXeunRAHxtetwCQNysjAIaRxd2zZy2P4WzIabB4uzgLYNtAiODLx2BLaDiAW%2FUp35Cm6LTAyV06%2B5D6pJJf6jS2PeWakQ%2BgXHuVyRQtCOxy%2BlaI%2F%2B%2BqEWgZj1LpDWfka3zsKPGZfCkZzQmePl9C9b3MXn%2F2CStmzKjxfOnFnnIcjQPYMncJAVMSnxWHW53n6z%2BKMIez7KQGOqUBnfInCmrnlz5fokLvU8diu2nVIiM86E6ObtSeiB5JKj6qkQnDb%2FlwkYtGwZYFZDwWlL35Z1lYrSfUMsTiglR2sdgZ6hr4FsOrW3Dijrixs7lgN85bqt8qTBWStNu29EIvWmTcbwR2%2Ba7H%2FSozfIRVg2X7jFWWxykCtCVPVQnsAZEZSqYsswVsjEu%2F8r2iuYsVh25%2Bq7DMWLia36%2BIfXEgp9j%2Bnav0&X-Amz-SignedHeaders=host&X-Amz-Signature=ab1a12505c2de2b15add07294661b11e5b0436e866cf7c9171527957a257ec89", ".")
  .catch(console.error);
