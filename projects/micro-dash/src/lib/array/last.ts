/**
 * Gets the last element of array.
 *
 * Differences from lodash:
 * - no special consideration is given to string-keyed values set on the array
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 92 bytes
 * - Micro-dash: 57 bytes
 */
export function last<T>(array: readonly T[]): T {
  return array[array.length - 1];
}
