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
export class Blocker {
    constructor() {
        this.isPending = false;
    }
    /**
     * Get whether it is pending or not
     */
    get pending() {
        return this.isPending;
    }
    /**
     * Start the blocker
     * @returns A value from `off(value: T)`
     */
    on() {
        return new Promise(resolve => {
            this.isPending = true;
            this.resolvePromise = resolve;
        });
    }
    /**
     * Stop the blocker
     * @param value - A value that `on()` will receive
     */
    off(value) {
        var _a;
        this.isPending = false;
        (_a = this.resolvePromise) === null || _a === void 0 ? void 0 : _a.call(this, value);
    }
}
