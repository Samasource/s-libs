import {
  Directive,
  ErrorHandler,
  InjectFlags,
  Injector,
  OnInit,
  ProviderToken,
} from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { wrapMethod } from '@s-libs/js-core';
import { bindKey, flow } from '@s-libs/micro-dash';
import {
  MonoTypeOperatorFunction,
  Observable,
  retry,
  Subject,
  tap,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { ControlSynchronizer } from './control-synchronizer';
import { FormComponentSuperclass } from './form-component-superclass';

/**
 * Extend this when creating a form component that simply wraps existing ones, to reduce a lot of boilerplate. **Warning:** You _must_ include a constructor in your subclass.
 *
 * To wrap a single form control use the subclass {@linkcode WrappedFormControlSuperclass}:
 * ```ts
 * @Component({
 *   template: `<input [formControl]="control">`,
 *   providers: [provideValueAccessor(StringComponent)],
 * })
 * class StringComponent extends WrappedFormControlSuperclass<string> {}
 * ```
 *
 * Example of wrapping multiple inner components:
 * ```ts
 * class FullName {
 *   firstName = '';
 *   lastName = '';
 * }
 *
 * @Component({
 *   selector: 'app-full-name',
 *   template: `
 *     <div [formGroup]="control">
 *       <input id="first" formControlName="firstName" />
 *       <input id="last" formControlName="lastName" />
 *     </div>
 *   `,
 *   providers: [provideValueAccessor(FullNameComponent)],
 * })
 * class FullNameComponent extends WrappedControlSuperclass<FullName> {
 *   control = new FormGroup({
 *     firstName: new FormControl(),
 *     lastName: new FormControl(),
 *   });
 *
 *   protected outerToInnerValue(outer: FullName | null): FullName {
 *     // `outer` can come in as `null` during initialization when the user binds with `ngModel`
 *     return outer || new FullName();
 *   }
 * }
 * ```
 *
 * Example when you need to modify the wrapped control's value:
 * ```ts
 * @Component({
 *   template: `<input type="datetime-local" [control]="formControl">`,
 *   providers: [provideValueAccessor(DateComponent)],
 * })
 * class DateComponent extends WrappedFormControlSuperclass<Date, string> {
 *   protected innerToOuterValue(inner: string): Date {
 *     return new Date(inner + "Z");
 *   }
 *
 *   protected outerToInnerValue(outer: Date): string {
 *     if (outer === null) {
 *       return ""; // happens during initialization
 *     }
 *     return outer.toISOString().substr(0, 16);
 *   }
 * }
 * ```
 *
 * If you bind to your component using an {@linkcode NgControl} (e.g. when using `ngModel`), validation errors will be synchronized between it and the control inside your component. You can override various methods below to control or disable that process. Note that validation, `statuschanges`, and `valuechanges` may all happen more often as a result of this synchronization.
 */
@Directive()
export abstract class WrappedControlSuperclass<OuterType, InnerType = OuterType>
  extends FormComponentSuperclass<OuterType>
  implements OnInit
{
  /** Bind this to your inner form control to make all the magic happen. */
  abstract control: AbstractControl;

  #injector: Injector;
  #incomingValues$ = new Subject<OuterType>();
  #errorHandler: ErrorHandler;

  constructor(injector: Injector) {
    super(injector);
    this.#injector = injector;
    this.#errorHandler = injector.get(ErrorHandler);
    this.subscribeTo(
      this.setUpOuterToInnerValue$(this.#incomingValues$),
      (inner) => {
        this.control.setValue(inner, { emitEvent: false });
      },
    );
  }

  ngOnInit(): void {
    this.#bindValidation();
    this.subscribeTo(
      this.setUpInnerToOuterValue$(this.control.valueChanges),
      (outer) => {
        this.emitOutgoingValue(outer);
      },
    );
    wrapMethod(this.control, 'markAsTouched', {
      after: () => {
        this.onTouched();
      },
    });
  }

  /** Called as angular propagates values changes to this `ControlValueAccessor`. You normally do not need to use it. */
  handleIncomingValue(outer: OuterType): void {
    this.#incomingValues$.next(outer);
  }

  /** Called as angular propagates disabled changes to this `ControlValueAccessor`. You normally do not need to use it. */
  override setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
    super.setDisabledState(this.isDisabled);
  }

  /**
   * Override this to for full control over the stream of values passed in to your subclass.
   *
   * In this example, incoming values are debounced before being passed through to the inner form control
   * ```ts
   * setUpOuterToInnerValue$(outer$: Observable<OuterType>): Observable<InnerType> {
   *   return outer$.pipe(
   *     debounce(300),
   *     map((outer) => doExpensiveTransformToInnerValue(outer)),
   *   );
   * }
   * ```
   *
   * For a simple transformation, see {@linkcode #outerToInnerValue} instead.
   */
  protected setUpOuterToInnerValue$(
    outer$: Observable<OuterType>,
  ): Observable<InnerType> {
    return outer$.pipe(
      map((outer) => this.outerToInnerValue(outer)),
      this.#handleError(),
    );
  }

  /**
   * Override this to modify a value coming from the outside to the format needed within this component.
   *
   * For more complex needs, see {@linkcode #setUpOuterToInnerValue$} instead.
   */
  protected outerToInnerValue(outer: OuterType): InnerType {
    return outer as unknown as InnerType;
  }

  /**
   * Override this to for full control over the stream of values emitted from your subclass.
   *
   * In this example, illegal values are not emitted
   * ```ts
   * setUpInnerToOuterValue$(inner$: Observable<InnerType>): Observable<OuterType> {
   *   return inner$.pipe(
   *     filter((inner) => isLegalValue(outer)),
   *   );
   * }
   * ```
   *
   * For a simple transformation, see {@linkcode #innerToOuterValue} instead.
   */
  protected setUpInnerToOuterValue$(
    inner$: Observable<InnerType>,
  ): Observable<OuterType> {
    return inner$.pipe(
      map((inner) => this.innerToOuterValue(inner)),
      this.#handleError(),
    );
  }

  /**
   * Override this to modify a value coming from within this component to the format expected on the outside.
   *
   * For more complex needs, see {@linkcode #setUpInnerToOuterValue$} instead.
   */
  protected innerToOuterValue(inner: InnerType): OuterType {
    return inner as unknown as OuterType;
  }

  /**
   * Override this to for full control over the stream of validation errors synchronized in to your subclass.
   *
   * For a simple transformation, see {@linkcode #outerToInnerErrors} instead.
   */
  protected setUpOuterToInnerErrors$(
    outer$: Observable<ValidationErrors>,
  ): Observable<ValidationErrors> {
    return outer$.pipe(
      map((inner) => this.outerToInnerErrors(inner)),
      this.#handleError(),
    );
  }

  /**
   * Override this to modify validation errors that synchronize in to this component.
   *
   * In this example we assume the `required` validation is handled by the user and should not affect internal validation
   * ```ts
   * protected override outerToInnerErrors(
   *   errors: ValidationErrors,
   * ): ValidationErrors {
   *   return omit(errors, 'required');
   * }
   * ```
   *
   * For more complex needs, see {@linkcode #setUpOuterToInnerErrors$} instead.
   */
  protected outerToInnerErrors(errors: ValidationErrors): ValidationErrors {
    return errors;
  }

  /**
   * Override this to for full control over the stream of validation errors synchronized out from your subclass.
   *
   * In this example, synchronization is turned off:
   * ```ts
   * protected override setUpInnerToOuterErrors$(): Observable<ValidationErrors> {
   *   return EMPTY;
   * }
   * ```
   *
   * For a simple transformation, see {@linkcode #innerToOuterErrors} instead.
   */
  protected setUpInnerToOuterErrors$(
    inner$: Observable<ValidationErrors>,
  ): Observable<ValidationErrors> {
    return inner$.pipe(
      map((inner) => this.innerToOuterErrors(inner)),
      this.#handleError(),
    );
  }

  /**
   * Override this to modify validation errors that synchronize out from this component.
   *
   * For more complex needs, see {@linkcode #setUpInnerToOuterErrors$} instead.
   */
  protected innerToOuterErrors(errors: ValidationErrors): ValidationErrors {
    return errors;
  }

  async #bindValidation(): Promise<void> {
    // Hack-fixing a production bug: https://github.com/simontonsoftware/s-libs/issues/82. `ngModel` and `formControl` both set their `.control` before this component is initialized. However, `formControlName` does not. This is a timing hack to accommodate by delaying on the microtask queue.
    await Promise.resolve();

    const outerControl = this.#selfInject(NgControl)?.control;
    if (outerControl) {
      ControlSynchronizer.synchronize(
        outerControl,
        this.control,
        this.setUpOuterToInnerErrors$.bind(this),
        this.setUpInnerToOuterErrors$.bind(this),
        this,
      );
    }
  }

  #handleError<T>(): MonoTypeOperatorFunction<T> {
    return flow(
      tap<T>({ error: bindKey(this.#errorHandler, 'handleError') }),
      retry(),
    );
  }

  #selfInject<T>(token: ProviderToken<T>): T | undefined {
    return this.#injector.get(
      token,
      undefined,
      // eslint-disable-next-line no-bitwise
      InjectFlags.Self | InjectFlags.Optional,
    );
  }
}
