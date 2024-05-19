export type Result<T> = T | Error;

/**
 * Determines if the `Result` is of type `T`.
 *
 * ## Example
 * ```ts
 * const result = await TryAsync(() => {...}) // `T | Error`
 *
 * if (Ok(result)) {
 *   // result -> `T`
 * }
 * ```
 */
export const Ok = <T>(r: Result<T>): r is T => !(r instanceof Error);

/**
 * Determines if the `Result` is of type `Error`.
 *
 * ## Example
 * ```ts
 * const result = await TryAsync(() => {...}) // `T | Error`
 *
 * if (Err(result)) {
 *   // result -> `Error`
 * }
 * ```
 */
export const Err = <T>(r: Result<T>): r is Error => !Ok(r);

/**
 * Wrap your function call in a `Try` to return back a `Result<T>`
 *
 * ## Example
 * ```ts
 * const fnMayFail = (input: number): number => {...}
 *
 * const result = Try(fnMayFail)(10) // Result<number>
 * ```
 */
export const Try = <F extends (...args: any[]) => any>(fn: F) => {
  return (...args: Parameters<typeof fn>): Result<ReturnType<typeof fn>> => {
    try {
      return fn(...args);
    } catch (error) {
      return error as Error;
    }
  };
};

/**
 * Wrap your function call in a `TryAsync` to return back a `Promise<Result<T>>`
 *
 * ## Example
 * ```ts
 * const fnMayFailAsync = async (input: number): number => {...}
 *
 * const result = await TryAsync(fnMayFailAsync)(10) // Result<number>
 * ```
 */
export const TryAsync = <F extends (...args: any[]) => Promise<any>>(fn: F) => {
  return async (
    ...args: Parameters<typeof fn>
  ): Promise<Result<ReturnType<typeof fn>>> => {
    return fn(...args)
      .then((value) => value)
      .catch((error) => {
        if (error instanceof Error) {
          return error;
        }

        return new Error(JSON.stringify(error));
      });
  };
};

/**
 * Unwrap a `Result<T>` and return back the value of type `T`.
 * If the `Result<T>` is an `Error`, return back the `fallback` value.
 *
 * ## Example
 * ```ts
 * const result = await TryAsync(() => {...}) // `T | Error`
 *
 * const value = UnwrapOr(result, 10) // `T | 10`
 * ```
 */
export const UnwrapOr = <T>(r: Result<T>, fallback: T): T => {
  return Ok(r) ? r : fallback;
};
