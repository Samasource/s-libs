import { Constructor } from '@s-libs/js-core';
import { Observable, Subscription, Unsubscribable } from 'rxjs';

/**
 * Mixes in {@link SubscriptionManager} as an additional superclass.
 *
 * ```ts
 * class MySubclass extends mixInSubscriptionManager(MyOtherSuperclass) {
 *   subscribeAndManage(observable: Observable<any>) {
 *     this.subscribeTo(observable);
 *   }
 * }
 * ```
 */
/* eslint-disable max-lines-per-function */
// uses default export as a workaround for https://github.com/microsoft/TypeScript/issues/30355#issuecomment-671095933
export default <B extends Constructor>(Base: B) => {
  return class extends Base implements Unsubscribable {
    private subscriptions = new Subscription();

    subscribeTo<T>(
      observable: Observable<T>,
      next?: (value: T) => void,
      error?: (error: any) => void,
      complete?: () => void,
    ): void {
      this.subscriptions.add(
        observable.subscribe(
          next?.bind(this),
          error?.bind(this),
          complete?.bind(this),
        ),
      );
    }

    manage(subscription: Subscription): void {
      this.subscriptions.add(subscription);
    }

    unsubscribe(): void {
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();
    }
  };
};
