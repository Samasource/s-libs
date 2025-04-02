import { reduceRight } from '@sama/micro-dash';

console.log(
  reduceRight([], () => 1),
  reduceRight({ a: 1 }, (key) => key),
);
