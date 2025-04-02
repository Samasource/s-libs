import { By } from '@angular/platform-browser';
import { assert } from '@sama/js-core';
import { AngularContext, ComponentContext } from '@sama/ng-dev';

export function getStyle(selector: string): CSSStyleDeclaration {
  const ctx = AngularContext.getCurrent();
  assert(ctx instanceof ComponentContext);
  return getComputedStyle(
    ctx.fixture.debugElement.query(By.css(selector)).nativeElement,
  );
}
