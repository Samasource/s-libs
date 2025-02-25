import {
  ArrayIteratee,
  ArrayNarrowingIteratee,
  Cast,
  IfCouldBe,
  KeyNarrowingIteratee,
  Nil,
  ObjectIteratee,
  ValueNarrowingIteratee,
} from '../interfaces';
import { forEach } from './for-each';

/**
 * Iterates over elements of `collection`, returning an array of all elements `predicate` returns truthy for.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,451 bytes
 * - Micro-dash: 326 bytes
 */

export function filter<I, O>(
  array: Nil | readonly I[],
  predicate: ArrayNarrowingIteratee<O>,
): Array<Extract<I, O> | Extract<O, I>>;
export function filter<T>(
  array: Nil | readonly T[],
  predicate: ArrayIteratee<T, boolean>,
): T[];

export function filter<I, O>(
  object: I | Nil,
  predicate: ValueNarrowingIteratee<I, O>,
): Array<Extract<I[keyof I], O> | Extract<O, I[keyof I]>>;
export function filter<I, O>(
  object: I | Nil,
  predicate: KeyNarrowingIteratee<I, O>,
): Array<{ [K in keyof I]: IfCouldBe<Cast<K, string>, O, I[K]> }[keyof I]>;
export function filter<T>(
  object: Nil | T,
  predicate: ObjectIteratee<T, boolean>,
): Array<T[keyof T]>;

export function filter(collection: any, predicate: Function): any[] {
  const result: any[] = [];
  forEach(collection, (item, indexOrKey) => {
    if (predicate(item, indexOrKey)) {
      result.push(item);
    }
  });
  return result;
}
