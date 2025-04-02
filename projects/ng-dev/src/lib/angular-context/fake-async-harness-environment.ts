import { HarnessEnvironment } from '@angular/cdk/testing';
import { UnitTestElement } from '@angular/cdk/testing/testbed';
import { flush } from '@angular/core/testing';
import { bindKey } from '@sama/micro-dash';
import { AngularContext } from './angular-context';

export class FakeAsyncHarnessEnvironment extends HarnessEnvironment<Element> {
  protected constructor(
    rawRootElement: Element,
    private ctx: AngularContext,
  ) {
    super(rawRootElement);
  }

  static documentRootLoader(ctx: AngularContext): FakeAsyncHarnessEnvironment {
    return new FakeAsyncHarnessEnvironment(document.body, ctx);
  }

  async waitForTasksOutsideAngular(): Promise<void> {
    flush();
  }

  async forceStabilize(): Promise<void> {
    this.ctx.tick();
  }

  protected createEnvironment(element: Element): HarnessEnvironment<Element> {
    return new FakeAsyncHarnessEnvironment(element, this.ctx);
  }

  protected createTestElement(element: Element): UnitTestElement {
    return new UnitTestElement(element, bindKey(this, 'forceStabilize'));
  }

  protected async getAllRawElements(selector: string): Promise<Element[]> {
    return Array.from(this.rawRootElement.querySelectorAll(selector));
  }

  protected getDocumentRoot(): Element {
    return document.body;
  }
}
