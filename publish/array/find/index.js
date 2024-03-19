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
export function find(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (callback(item, i, arr)) {
            return item;
        }
    }
    return undefined;
}
