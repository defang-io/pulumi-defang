import assert = require("assert");

export type Primitive = string | number | boolean | null | undefined;

// Like `optionals` from Nixpkgs, returns [] if the condition is false.
export function optionals<T>(cond: any, ...args: T[]): T[] {
  return cond ? args : [];
}

export function setsEqual<T extends Primitive>(a: Set<T>, b: Set<T>): boolean {
  return a.size === b.size && [...a].every((v) => b.has(v));
}

export function mapObject(
  obj: { [key: string]: any },
  fn: (value: any, key: string, obj: any) => any
): { [key: string]: any } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key, obj)])
  );
}

export function deleteUndefined<T extends {}>(obj: T): T {
  mapObject(obj, (v, k, o) => {
    if (v === undefined) {
      delete o[k];
    } else if (typeof v === "object") {
      deleteUndefined(v);
    }
  });
  return obj;
}

assert.deepStrictEqual(deleteUndefined({ a: 1, b: undefined }), { a: 1 });
