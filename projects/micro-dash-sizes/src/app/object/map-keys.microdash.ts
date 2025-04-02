import { mapKeys } from '@sama/micro-dash';

console.log(
  mapKeys([1], () => 1),
  mapKeys({ a: 1 }, () => 1),
);
