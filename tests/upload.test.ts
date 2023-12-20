import { assert } from "chai";
import { rm, rmdir } from "fs/promises";
import "mocha";
import { dirname, resolve } from "path";
import * as upload from "../upload";

describe("createTarball", () => {
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
    it(`create tarball for ${dockerfile}`, async () => {
      try {
        const tgz = await upload.createTarball(
          resolve(__dirname, "./test1"),
          dockerfile
        );
        await rm(tgz);
        await rmdir(dirname(tgz));
      } catch (err) {
        assert(err instanceof Error);
        assert.equal(err.message, error);
        return;
      }
      if (error) {
        assert.fail(`Expected failure for ${dockerfile}`);
      }
    });
  }
});
