import { invoke } from '@sama/micro-dash';

invoke(
  {
    a(val: any): void {
      console.log(val);
    },
  },
  ['hi'],
);
