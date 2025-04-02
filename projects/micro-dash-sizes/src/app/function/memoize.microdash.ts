import { memoize } from '@sama/micro-dash';

memoize((a: string) => a)('a');
memoize(
  (a: string) => a,
  (b: string) => b,
)('a');
