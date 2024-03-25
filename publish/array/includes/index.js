/**
 * Find a target element whether included in the array or not.
 *
 * @example
 * ```ts
 * import { includes } from '@norwa/utils/array/includes'
 *
 * includes([1, 2, 3], 1) // out: true
 * includes([1, 2, 3], 0) // out: false
 * ```
 *
 * @param arr - Array to search from
 * @param target - Element to search
 * @returns Is it included in `arr`
 *
 * @public
 */
export function includes(arr, target) {
    return arr.indexOf(target) !== -1;
}
