import { Existent, Primitive, ValueIteratee } from '../interfaces';
import { findExtreme } from './extreme-utils';

/**
 * This function is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,906 bytes
 * - Micro-dash: 219 bytes
 */
export function minBy<T extends Existent>(
  array: readonly T[],
  iteratee: ValueIteratee<T, Primitive>,
): T {
  return findExtreme(
    array,
    iteratee,
    (candidate, current) => candidate < current,
  );
}
