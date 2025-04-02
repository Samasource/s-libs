import {
  PersistentStore,
  RootStore,
  Store,
  spreadArrayStore,
  pushToArrayStore,
} from '@sama/signal-store';
import { staticTest } from '@sama/ng-dev';
import { expectTypeOf } from 'expect-type';

describe('signal-store', () => {
  it('has PersistentStore', () => {
    expect(PersistentStore).toBeDefined();
  });

  it('has RootStore', () => {
    expect(RootStore).toBeDefined();
  });

  it('has Store', () => {
    staticTest(() => {
      expectTypeOf<Store<number>>().toBeObject();
    });
  });

  it('has spreadArrayStore()', () => {
    expect(spreadArrayStore).toBeDefined();
  });

  it('has pushToArrayStore()', () => {
    expect(pushToArrayStore).toBeDefined();
  });
});
