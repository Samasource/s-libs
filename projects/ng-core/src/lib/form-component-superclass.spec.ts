import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentContext } from '@s-libs/ng-dev';
import { click, find, findButton } from '../test-helpers';
import { DirectiveSuperclass } from './directive-superclass';
import {
  FormComponentSuperclass,
  provideValueAccessor,
} from './form-component-superclass';
import { InjectableSuperclass } from './injectable-superclass';

@Component({
  template: `
    <sl-counter
      [(ngModel)]="value"
      #counter="ngModel"
      [disabled]="shouldDisable"
    ></sl-counter>
    <div *ngIf="counter.touched">Touched!</div>
    <button (click)="shouldDisable = !shouldDisable">Toggle Disabled</button>
  `,
})
class TestComponent {
  @Input() value = 0;
  @Input() shouldDisable = false;
}

@Component({
  selector: `sl-counter`,
  template: `
    <button (click)="increment()" [disabled]="isDisabled">{{ counter }}</button>
  `,
  providers: [provideValueAccessor(CounterComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CounterComponent extends FormComponentSuperclass<number> {
  counter = 0;

  handleIncomingValue(value: number): void {
    this.counter = value;
  }

  increment(): void {
    this.emitOutgoingValue(++this.counter);
    this.onTouched();
  }
}

describe('FormComponentSuperclass', () => {
  let ctx: ComponentContext<TestComponent>;
  beforeEach(() => {
    ctx = new ComponentContext(TestComponent, {
      imports: [FormsModule],
      declarations: [CounterComponent],
      // this can go away with component harnesses eventually
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
  });

  function incrementButton(): HTMLButtonElement {
    return find<HTMLButtonElement>(ctx.fixture, 'sl-counter button');
  }

  function toggleDisabledButton(): HTMLButtonElement {
    return findButton(ctx.fixture, 'Toggle Disabled');
  }

  it('provides help for 2-way binding', () => {
    ctx.assignInputs({ value: 15 });
    ctx.run(() => {
      expect(ctx.getComponentInstance().value).toBe(15);
      expect(ctx.fixture.nativeElement.innerText).toContain('15');

      click(incrementButton());
      expect(ctx.getComponentInstance().value).toBe(16);
      expect(ctx.fixture.nativeElement.innerText).toContain('16');
    });
  });

  it('provides help for `onTouched`', () => {
    ctx.run(() => {
      expect(ctx.fixture.nativeElement.innerText).not.toContain('Touched!');
      click(incrementButton());
      expect(ctx.fixture.nativeElement.innerText).toContain('Touched!');
    });
  });

  it('provides help for `[disabled]`', () => {
    ctx.assignInputs({ shouldDisable: true });
    ctx.run(() => {
      expect(incrementButton().disabled).toBe(true);

      click(toggleDisabledButton());
      expect(incrementButton().disabled).toBe(false);
    });
  });

  it('has the right class hierarchy', () => {
    ctx.run(() => {
      const counter = ctx.fixture.debugElement.query(
        By.directive(CounterComponent),
      ).componentInstance;
      expect(counter instanceof InjectableSuperclass).toBe(true);
      expect(counter instanceof DirectiveSuperclass).toBe(true);
    });
  });
});
