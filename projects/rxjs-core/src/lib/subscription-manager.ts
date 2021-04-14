import mixInSubscriptionManager from './mix-in-subscription-manager';

/**
 * Tracks all subscriptions to easily unsubscribe from them all during cleanup. Also binds callbacks to `this` for convenient use as a superclass, e.g.:
 *
 * ```ts
 * class EventLogger extends SubscriptionManager {
 *   constructor(private prefix: string, event$: Observable<string>) {
 *     super();
 *
 *     // you can pass in an instance method here and it will be bound to `this`
 *     this.subscribeTo(event$, this.log);
 *   }
 *
 *   log(event: string) {
 *     // even though this is used as a callback, you can still use `this`
 *     console.log(this.prefix + event);
 *   }
 * }
 * ```
 */
export class SubscriptionManager extends mixInSubscriptionManager(Object) {}
