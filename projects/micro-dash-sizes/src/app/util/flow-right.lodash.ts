import flowRight from 'lodash-es/flowRight';

const increment = (x: number): number => x + 1;
console.log(flowRight((flowRight as any)(), increment)(1));
