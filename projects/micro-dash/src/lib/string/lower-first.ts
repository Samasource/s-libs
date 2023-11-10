import { Nil } from '../interfaces';

/**
 * Converts the first character of `string` to lower case.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,412 bytes
 * - Micro-dash: 100 bytes
 */
export function lowerFirst(string: Nil | string): string {
  return string ? string.charAt(0).toLowerCase() + string.slice(1) : '';
}
