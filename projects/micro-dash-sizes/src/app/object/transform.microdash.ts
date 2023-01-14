import { transform } from '@s-libs/micro-dash';

console.log(
  transform(
    { a: false, b: true },
    (accum: Record<string, boolean>, value, key) => (accum[key] = value),
  ),
);
