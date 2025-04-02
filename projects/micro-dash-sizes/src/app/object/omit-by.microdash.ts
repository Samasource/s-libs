import { omitBy } from '@sama/micro-dash';

omitBy({ a: 1 }, () => true);
omitBy({ a: 1 }, () => false);
