import {
  matButtonHarnessWithIcon,
  provideMatIcons,
  SlDialogHarness,
  SlDialogModule,
  SlDialogService,
} from '@sama/ng-mat-core';

describe('ng-mat-core', () => {
  it('has matButtonHarnessWithIcon', () => {
    expect(matButtonHarnessWithIcon).toBeDefined();
  });

  it('has provideMatIcons', () => {
    expect(provideMatIcons).toBeDefined();
  });

  it('has SlDialogHarness', () => {
    expect(SlDialogHarness).toBeDefined();
  });

  it('has SlDialogModule', () => {
    expect(SlDialogModule).toBeDefined();
  });

  it('has SlDialogService', () => {
    expect(SlDialogService).toBeDefined();
  });
});
