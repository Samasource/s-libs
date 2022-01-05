import { Injectable, OnDestroy } from '@angular/core';
import { Constructor } from '@s-libs/js-core';
import {
  mixInSubscriptionManager,
  SubscriptionManager,
} from '@s-libs/rxjs-core';
import { Subject } from 'rxjs';

/**
 * Mixes in {@link InjectableSuperclass} as an additional superclass.
 *
 * ```ts
 * class MySubclass extends mixInInjectableSuperclass(MyOtherSuperclass) {
 *   subscribeWithAutoUnsubscribe(observable: Observable<any>) {
 *     this.subscribeTo(observable);
 *   }
 * }
 * ```
 */
export function mixInInjectableSuperclass<B extends Constructor>(Base: B) {
  return class extends mixInSubscriptionManager(Base) implements OnDestroy {
    #destructionSubject = new Subject<undefined>();

    /**
     * An observable that emits once when this object is destroyed, then completes.
     */
    destruction$ = this.#destructionSubject.asObservable();

    ngOnDestroy(): void {
      this.unsubscribe();
      this.#destructionSubject.next();
      this.#destructionSubject.complete();
    }
  };
}

/**
 * Use as the superclass for anything managed by angular's dependency injection for care-free use of `subscribeTo()`. It simply calls `unsubscribe()` during `ngOnDestroy()`. If you override `ngOnDestroy()` in your subclass, be sure to invoke the super implementation.
 *
 * ```ts
 * @Injectable() // or @Component(), @Directive() or @Pipe(), but consider DirectiveSuperclass
 * class MyThing extends InjectableSuperclass {
 *   constructor(somethingObservable: Observable) {
 *     super();
 *     this.subscribeTo(somethingObservable);
 *   }
 *
 *   ngOnDestroy() {
 *     // if you override ngOnDestroy, be sure to call this too
 *     super.ngOnDestroy();
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class InjectableSuperclass
  extends SubscriptionManager
  implements OnDestroy {
  #destructionSubject = new Subject<undefined>();

  /**
   * An observable that emits once when this object is destroyed, then completes.
   */
  destruction$ = this.#destructionSubject.asObservable();

  ngOnDestroy(): void {
    this.unsubscribe();
    this.#destructionSubject.next();
    this.#destructionSubject.complete();
  }
}
