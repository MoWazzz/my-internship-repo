import { describe, it, expect } from "vitest";
import { sum, unique, chunk, safeJsonParse, retry } from "./utils.js";

import { isOk, isErr } from "./result.js";

describe("sum", () => {
    it("adds numbers", () => {
        expect(sum([1, 2, 3])).toBe(6);
    });
});

describe("unique", () => {
    it("removes duplicates", () => {
        expect(unique([1, 1, 2])).toEqual([1, 2]);
    });
});

describe("chunk", () => {
    it("splits an array into chunks", () => {
        expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4],]);
    });
});

describe("safeJsonParse", () => {
    it("parses valid json", () => {
        const result = safeJsonParse<{ name: string }>('{"name": "Alice"}');

        expect(isOk(result)).toBe(true);
    });

    it("fails invalid json", () => {
        const result = safeJsonParse("bad json");

        expect(isErr(result)).toBe(true);
    });
});

describe("retry", () => {
    it("retries until succeeds", async () => {
        let attempts = 0;

        const fn = async () => {
            attempts++;

            if (attempts < 3) {
                throw new Error("Failed");
            }

            return "Success";
        };

        const result = await retry(fn, 3);
        
        expect(result).toBe("Success");
    });
});
