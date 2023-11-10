/**
 * Casts `value` as an array if it's not one.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 137 bytes
 * - Micro-dash: 69 bytes
 */
export function castArray<T>(value: T): T extends readonly unknown[] ? T : T[] {
  return (Array.isArray(value) ? value : [value]) as any;
}
