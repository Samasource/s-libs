import { identity, sortBy } from '@sama/micro-dash';

/**
 * Creates an array of elements, sorted in ascending order as determined by the `<` and `>` operators. This function performs a stable sort, that is, it preserves the original sort order of equal elements.
 */
export function sort<T>(
  collection: Record<string, T> | readonly T[] | null | undefined,
): T[] {
  return sortBy(collection, identity);
}
