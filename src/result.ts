export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export const ok = <T>(value: T): Result<T, never> => {
    return { ok: true, value };
}

export const err = <E>(error: E): Result<never, E> => {
    return { ok: false, error };
}

export const isOk = <T, E>(result: Result<T, E>): boolean => {
    return result.ok;
}

export const isErr = <T, E>(result: Result<T, E>): boolean => {
    return !result.ok;
}