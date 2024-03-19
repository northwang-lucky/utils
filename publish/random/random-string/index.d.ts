/**
 * Generate a random string.
 *
 * @example
 * ```ts
 * import { randomString } from '@norwa/utils/random/random-string'
 *
 * randomString(6)
 * randomString(6, { charset: '1234567890' })
 * randomString(6, { removeConfusion: true })
 * ```
 *
 * @param len - Length of string
 * @param opts - Optional parameters
 * @returns A random string
 *
 * @public
 */
export declare function randomString(len: number, opts?: {
    /** The character set used to generate the string */
    charset?: string;
    /** If it is set to true, "iIlL1oO0" will be removed from `charset` */
    removeConfusion?: boolean;
}): string;
