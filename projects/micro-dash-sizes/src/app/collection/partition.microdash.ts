import { partition } from '@sama/micro-dash';

console.log(
  partition([1], () => {}),
  partition({ a: 1 }, () => {}),
);
