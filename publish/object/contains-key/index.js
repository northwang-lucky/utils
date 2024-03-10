export function containsKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
