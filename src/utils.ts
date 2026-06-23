import type { Result } from "./result.js";
import { ok, err } from "./result.js";

export const sum = (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
};

export const unique = <T>(items: T[]): T[] => {
    return [...new Set(items)];
}

export const chunk = <T>(items: T[], size: number): T[][] => {
    const results: T[][] = [];

    for (let i = 0; i < items.length; i += size) {
        results.push(items.slice(i, i + size));
    }
    return results;
}

export const safeJsonParse = <T>(
    input: string
):Result<T, string> => {

    try{
        const parsed = JSON.parse(input) as T;
        return ok(parsed);
    } catch {
        return err("Invalid JSON");
    }
}

export const retry = async <T>(
    fn: () => Promise<T>,
    attempts: number
): Promise<T> => {

    let lastError;

    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
}