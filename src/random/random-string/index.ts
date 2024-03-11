/**
 * Generate a random string.
 *
 * @example
 * ```ts
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
export function randomString(
  len: number,
  opts: {
    /** The character set used to generate the string */
    charset?: string;
    /** If it is set to true, "iIlL1oO0" will be removed from `charset` */
    removeConfusion?: boolean;
  } = {}
): string {
  const {
    charset: _charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    removeConfusion = false,
  } = opts;
  let charset = _charset;
  if (removeConfusion) {
    charset = charset.replace(/[iIlL1oO0]/g, '');
  }
  let result = '';
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
