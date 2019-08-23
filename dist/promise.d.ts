/**
 * cbToPromise is a helper function that executes callback invoking function and returns a promise that
 * gets resolves as soon as the callback function gets invoked.
 */
export declare const cbToPromise: <TResult>(fnExecutor: (callback: any) => any) => Promise<TResult>;
