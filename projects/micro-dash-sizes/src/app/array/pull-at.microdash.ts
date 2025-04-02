import { pullAt } from '@sama/micro-dash';

console.log(
  pullAt([1, 2, 3], 1),
  pullAt([1, 2, 3], [1]),
  pullAt([1, 2, 3], [1, 2]),
);
