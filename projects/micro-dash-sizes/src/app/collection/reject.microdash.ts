import { reject } from '@sama/micro-dash';

console.log(
  reject([1], () => true),
  reject({ a: 1 }, () => false),
);
