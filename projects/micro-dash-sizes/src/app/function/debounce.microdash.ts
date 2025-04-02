import { debounce } from '@sama/micro-dash';

debounce(() => {})();
debounce((value: number) => {
  console.log(value);
}, 1)(1);
