import { every } from '@sama/micro-dash';

console.log(
  every([1], () => true),
  every({ a: 1 }, () => false),
);
