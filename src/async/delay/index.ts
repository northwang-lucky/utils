/**
 * A simple `Promise` implementation for `setTimeout`, used in some short delay, no need to clear the timer scenes.
 *
 * @example
 * ```ts
 * import {} from '@norwa/utils/async/delay'
 *
 * (async () => {
 * await delay(100)
 * // To do something...
 * })()
 * ```
 *
 * @param ms - Delay millseconds
 *
 * @public
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}
