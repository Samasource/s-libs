import { Directive } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { provideValueAccessor } from '@sama/ng-core';

/** @hidden */
@Directive({
  selector: 'select[multiple][nasModel]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
  providers: [
    provideValueAccessor(SelectMultipleValueAccessorDirective),
    {
      provide: SelectMultipleControlValueAccessor,
      useExisting: SelectMultipleValueAccessorDirective,
    },
  ],
  standalone: false,
})
export class SelectMultipleValueAccessorDirective extends SelectMultipleControlValueAccessor {}
