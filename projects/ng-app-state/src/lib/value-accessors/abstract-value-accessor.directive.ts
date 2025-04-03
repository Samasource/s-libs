import { Directive, ElementRef, Injector } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { noop } from '@sama/micro-dash';

@Directive()
export abstract class AbstractValueAccessorDirective<T extends HTMLElement>
  implements ControlValueAccessor
{
  onChangeFn!: (value: any) => void;
  onTouchedFn = noop;

  private elementRef: ElementRef;

  constructor(injector: Injector) {
    this.elementRef = injector.get(ElementRef);
  }

  protected get element(): T {
    return this.elementRef.nativeElement as T;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  abstract writeValue(value: unknown): void;
}
