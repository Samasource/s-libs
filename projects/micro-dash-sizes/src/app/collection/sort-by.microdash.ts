import { sortBy } from '@sama/micro-dash';

sortBy([1, 2], (i) => i);
sortBy({ a: 1, b: 2 }, [(i): number => i, (i): number => -i]);
