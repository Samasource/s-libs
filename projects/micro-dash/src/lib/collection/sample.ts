import { ObjectWith } from '../interfaces';
import { toArray } from '../lang';
import { random } from '../math';

/**
 * Gets a random element from `collection`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,884 bytes
 * - Micro-dash: 573 bytes
 */
export function sample<T>(collection: ObjectWith<T> | readonly T[]): T {
  collection = toArray(collection as any);
  return (collection as any)[random((collection as any[]).length - 1)];
}
