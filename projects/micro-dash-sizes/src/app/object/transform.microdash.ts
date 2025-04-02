import { transform } from '@sama/micro-dash';

console.log(
  transform(
    { a: false, b: true },
    (accum: Record<string, boolean>, value, key) => (accum[key] = value),
  ),
);
