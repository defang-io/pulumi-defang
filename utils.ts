import assert = require("assert");

// Like `optionals` from Nixpkgs, returns [] if the condition is false.
export function optionals<T>(cond: any, ...args: T[]): T[] {
  return cond ? args : [];
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

export function sortObject(obj: any): any {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null
    ? Object.keys(obj)
        .sort()
        .reduce((p: any, k: string) => ((p[k] = obj[k]), p), {})
    : obj;
}

assert.deepStrictEqual(sortObject({ b: 2, a: 1 }), { a: 1, b: 2 });

export function stableStringify(obj: any): string {
  return JSON.stringify(obj, (_, v) => sortObject(v));
}

assert.strictEqual(stableStringify({ b: 2, a: 1 }), '{"a":1,"b":2}');

export function isEqual(a: any, b: any): boolean {
  return stableStringify(a) === stableStringify(b);
}

assert(isEqual({ b: 2, a: 1 }, { a: 1, b: 2, c: undefined }));

export function isValidUint(x: number): boolean {
  return x >= 0 && Number.isSafeInteger(x); // returns false for NaN
}

assert(isValidUint(0));
assert(isValidUint(1));
assert(!isValidUint(-1));
assert(!isValidUint(1.1));
assert(!isValidUint(NaN));
