import { negate } from '@sama/micro-dash';

const isNotArray = negate(Array.isArray);
console.log(isNotArray(0), isNotArray([]));
