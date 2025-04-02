import { isFunction } from '@sama/micro-dash';

console.log(
  isFunction('a'),
  isFunction(() => {}),
);
