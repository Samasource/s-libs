import { OnDestroy } from '@angular/core';
import { Constructor } from '@s-libs/js-core';
import { mixInSubscriptionManager } from '@s-libs/rxjs-core';
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
// uses default export as a workaround for https://github.com/microsoft/TypeScript/issues/30355#issuecomment-671095933
export default <B extends Constructor>(Base: B) => {
  return class extends mixInSubscriptionManager(Base) implements OnDestroy {
    private destructionSubject = new Subject<undefined>();

    /**
     * An observable that emits once when this object is destroyed, then completes.
     */
    destruction$ = this.destructionSubject.asObservable();

    ngOnDestroy(): void {
      this.unsubscribe();
      this.destructionSubject.next();
      this.destructionSubject.complete();
    }
  };
};
