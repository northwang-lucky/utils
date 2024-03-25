import { find } from '../find';
const defaultIsEqual = (a, b) => a === b;
/**
 * Compare array B with array A, and returns differences.
 *
 * @example
 * ```ts
 * import { compare } from '@norwa/utils/array/compare'
 *
 * const a = [1, 2, 3]
 * const b = [2, 4]
 * const {
 *   added,     // [4]
 *   unchanged, // [2]
 *   removed,   // [1]
 *   lenDiff,   // -1
 *   lenDiffAbs // 1
 * } = compare(a, b)
 * ```
 *
 * @param A - Array A
 * @param B - Array B
 * @param opts - Optional params
 * @returns The extra elements, unchanged elements, removed elements, length difference and absolute value of array B compared with array A.
 *
 * @public
 */
export function compare(A, B, opts = {}) {
    const { isEqual = defaultIsEqual } = opts;
    const added = [];
    const removed = [];
    const unchanged = [];
    const lenDiff = B.length - A.length;
    // Check the new elements in B.
    for (const element of B) {
        if (!find(A, el => isEqual(el, element))) {
            added.push(element);
        }
        else {
            unchanged.push(element);
        }
    }
    // Check the reduced elements in B.
    for (const element of A) {
        if (!find(B, el => isEqual(el, element))) {
            removed.push(element);
        }
    }
    return {
        added,
        unchanged,
        removed,
        lenDiff,
        lenDiffAbs: Math.abs(lenDiff),
    };
}
