/**
 * This is a process blocker, whose role as it's name.
 * Implemented by {@link Promise}.
 *
 * @example
 * ```ts
 * import { Blocker } from '@northwang-lucky/utils/async/blocker'
 *
 * // without return value
 * const blocker = new Blocker()
 * setTimeout(() => {
 *   blocker.off()
 * }, 1000)
 * await blocker.on()
 *
 * // with return value
 * const blocker = new Blocker<string>()
 * setTimeout(() => {
 *   blocker.off('ok')
 * }, 1000)
 * const msg = await blocker.on() // msg: ok
 * ```
 *
 * @public
 */
export declare class Blocker<T = undefined> {
    private isPending;
    private resolvePromise?;
    /**
     * Get whether it is pending or not
     */
    get pending(): boolean;
    /**
     * Start the blocker
     * @returns A value from `off(value: T)`
     */
    on(): Promise<T | undefined>;
    /**
     * Stop the blocker
     * @param value - A value that `on()` will receive
     */
    off(value?: T): void;
}
