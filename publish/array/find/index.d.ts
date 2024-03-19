/**
 * Find a target value by callback.
 *
 * @example
 * ```ts
 * import { find } from '@norwa/utils/array/find'
 *
 * [1, 2, 3].find(n => n < 0) // output: false
 * [{ n: 1 }, { n: 2 }, { n: 3 }].find(it => it.n === 2) // output: true
 * ```
 *
 * @param arr - Target array
 * @param callback - Search callback
 * @returns A target value or `undefined`
 *
 * @public
 */
export declare function find<T>(arr: T[], callback: (item: T, index: number, arr: T[]) => boolean): T | undefined;
