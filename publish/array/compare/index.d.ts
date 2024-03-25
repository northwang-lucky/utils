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
export declare function compare<T>(A: T[], B: T[], opts?: {
    /** Implement your custom way to judge wether the two elements are equal. */
    isEqual?: (a: T, b: T) => boolean;
}): {
    added: T[];
    unchanged: T[];
    removed: T[];
    lenDiff: number;
    lenDiffAbs: number;
};
