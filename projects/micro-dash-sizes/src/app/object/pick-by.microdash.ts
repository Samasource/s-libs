import { pickBy } from '@sama/micro-dash';

pickBy({ a: 1 }, () => true);
pickBy({ a: 1 }, () => false);
