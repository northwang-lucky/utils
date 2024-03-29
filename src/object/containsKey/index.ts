/**
 * It only judges whether the object itself contains the passed-in key, not on the prototype chain.
 *
 * @example
 * ```ts
 * import { containsKey } from '@norwa/utils/object/containsKey'
 *
 * const obj = { a: 1 }
 * containsKey(obj, 'a') // echo true
 * containsKey<{ a: number; b?: string }>(obj, 'b') // echo false
 * ```
 *
 * @param obj - An object
 * @param key - A key whether is contained by the object or not
 * @returns Is the object contains the key
 *
 * @public
 */
export function containsKey(obj: object, key: string): boolean;
export function containsKey<T, K extends keyof T = keyof T>(obj: T, key: K): obj is T & Required<Pick<T, K>>;
export function containsKey<T, K extends keyof T = keyof T>(
  obj: T | object,
  key: keyof T | string
): obj is T & Required<Pick<T, K>> {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
