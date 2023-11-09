import { IfCouldBe, Nil, ObjectIteratee } from '../interfaces';

/**
 * The opposite of {@linkcode mapValues}; this function creates an object with the same values as `object` and keys generated by running each own enumerable string keyed property of object through `iteratee`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 16,189 bytes
 * - Micro-dash: 123 bytes
 */
export function mapKeys<A extends readonly any[], O extends PropertyKey>(
  array: A | Nil,
  iteratee: (item: A[number], index: number) => O,
): Record<O, A[number]>;
export function mapKeys<T, O extends PropertyKey>(
  object: T,
  iteratee: ObjectIteratee<NonNullable<T>, O>,
): IfCouldBe<T, Nil, {}> | Record<O, NonNullable<T>[keyof NonNullable<T>]>;
export function mapKeys(object: any, iteratee: Function): any {
  let obj: any = {};
  Object.keys(object || obj).forEach(
    (key) => (obj[iteratee(object[key], key)] = object[key]),
  );
  return obj;
}
