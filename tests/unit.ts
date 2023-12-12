import { rm, rmdir } from "fs/promises";
import { dirname, resolve } from "path";
import * as upload from "../upload";
import * as assert from "assert";

let result = "ok";

async function testMain(): Promise<void> {
  await testCreateTarball();
}

async function testCreateTarball(): Promise<void> {
  const tests = [
    {
      dockerfile: undefined,
      error: "the specified dockerfile could not be read: Dockerfile",
    },
    {
      dockerfile: "",
      error: "the specified dockerfile could not be read: Dockerfile",
    },
    {
      dockerfile: "blah",
      error: "the specified dockerfile could not be read: blah",
    },
    { dockerfile: "Dockerfile.test" },
    { dockerfile: "./Dockerfile.test" },
  ];
  for (const { dockerfile, error } of tests) {
    console.warn(`=== RUN   ${dockerfile}`);
    try {
      const tgz = await upload.createTarball(
        resolve(__dirname, "./test1"),
        dockerfile
      );
      await rm(tgz);
      await rmdir(dirname(tgz));
      if (error) {
        throw new Error(`Expected failure for ${dockerfile}`);
      }
    } catch (err) {
      assert(err instanceof Error, "Expected error");
      if (error !== err.message) {
        console.error(`    expected: ${error ?? "no error"}`);
        console.error(`--- FAIL: ${dockerfile}`);
        result = "FAIL";
        continue;
      }
    }
    console.warn(`--- PASS: ${dockerfile}`);
  }
}

testMain()
  .then(() => {
    console.warn(`${result}\t${__filename}`);
    process.exitCode = result === "ok" ? 0 : 1;
  })
  .catch((err) => {
    console.error(err.stack);
    process.exitCode = 2;
  });
