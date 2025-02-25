import {
  cache,
  createOperatorFunction,
  delayOnMicrotaskQueue,
  distinctUntilKeysChanged,
  filterBehavior,
  keepWakeLock$,
  logValues,
  mapAndCacheArrayElements,
  mapAndCacheObjectElements,
  mapToLatestFrom,
  mixInSubscriptionManager,
  skipAfter,
  SubscriptionManager,
  withHistory,
} from '@s-libs/rxjs-core';

describe('rxjs-core', () => {
  describe('public API', () => {
    it('has SubscriptionManager', () => {
      expect(SubscriptionManager).toBeDefined();
    });

    it('has mapAndCacheArrayElements', () => {
      expect(mapAndCacheArrayElements).toBeDefined();
    });

    it('has mapAndCacheObjectElements', () => {
      expect(mapAndCacheObjectElements).toBeDefined();
    });

    it('has cache', () => {
      expect(cache).toBeDefined();
    });

    it('has createOperatorFunction', () => {
      expect(createOperatorFunction).toBeDefined();
    });

    it('has delayOnMicrotaskQueue', () => {
      expect(delayOnMicrotaskQueue).toBeDefined();
    });

    it('has distinctUntilKeysChanged', () => {
      expect(distinctUntilKeysChanged).toBeDefined();
    });

    it('has filterBehavior', () => {
      expect(filterBehavior).toBeDefined();
    });

    it('has keepWakeLock$', () => {
      expect(keepWakeLock$).toBeDefined();
    });

    it('has logValues', () => {
      expect(logValues).toBeDefined();
    });

    it('has mapToLatestFrom', () => {
      expect(mapToLatestFrom).toBeDefined();
    });

    it('has mixInSubscriptionManager', () => {
      expect(mixInSubscriptionManager).toBeDefined();
    });

    it('has skipAfter', () => {
      expect(skipAfter).toBeDefined();
    });

    it('has withHistory', () => {
      expect(withHistory).toBeDefined();
    });
  });
});
