import { flowRight } from '@sama/micro-dash';

const increment = (x: number): number => x + 1;
flowRight(flowRight(), increment)(1);
