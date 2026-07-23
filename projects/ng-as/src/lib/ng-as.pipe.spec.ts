import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgAsAliasPipe, NgAsPipe } from './ng-as.pipe';
import { NgAsModule } from './ng-as.module';

interface Test {
  x: boolean;
}

describe('NgAsPipe', () => {
  it('renders through the standalone pipe', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate let-test
          ><div>{{ (test | as: Test).x }}</div></ng-template
        >`,
      imports: [NgAsPipe, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');
  });

  it('renders through the pipe re-exported by the module', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate let-test
          ><div>{{ (test | as: Test).x }}</div></ng-template
        >`,
      imports: [NgAsModule, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');
  });

  it('returns the very same reference it was given', () => {
    const pipe = new NgAsPipe();
    const source = { x: true };

    expect(pipe.transform<Test>(source, undefined)).toBe(source);
  });

  it.each([
    ['a string', 'text'],
    ['the number zero', 0],
    ['an empty string', ''],
    ['false', false],
    ['null', null],
    ['undefined', undefined],
    ['NaN', Number.NaN],
  ])('passes %s through untouched', (_label, value) => {
    const pipe = new NgAsPipe();

    // `NaN !== NaN`, so `toBe` (Object.is) is the assertion that also covers it
    expect(pipe.transform(value, undefined)).toBe(value);
  });

  it('ignores the type witness completely', () => {
    const pipe = new NgAsPipe();
    const source = { x: true };

    expect(pipe.transform<Test>(source, { x: false })).toBe(source);
  });

  it('is pure, so it is not re-evaluated while the input is stable', () => {
    @Component({
      template: `{{ (value | as: Test).x }}`,
      imports: [NgAsPipe],
    })
    class TestComponent {
      public Test!: Test;
      value: Test = { x: true };
      unrelated = 0;
    }

    const fixture = TestBed.createComponent(TestComponent);
    const transform = vi.spyOn(NgAsPipe.prototype, 'transform');

    fixture.detectChanges();
    const afterFirstRender = transform.mock.calls.length;

    fixture.componentInstance.unrelated++;
    fixture.detectChanges();

    expect(transform.mock.calls.length).toBe(afterFirstRender);
    transform.mockRestore();
  });
});

describe('NgAsAliasPipe', () => {
  it('renders under the prefixed `ngAs` name', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate let-test
          ><div>{{ (test | ngAs: Test).x }}</div></ng-template
        >`,
      imports: [NgAsAliasPipe, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');
  });

  it('is reachable through the module too, alongside `as`', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate let-test
          ><span>{{ (test | as: Test).x }}</span
          ><span>{{ (test | ngAs: Test).x }}</span></ng-template
        >`,
      imports: [NgAsModule, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('truetrue');
  });

  it('behaves exactly like the pipe it aliases', () => {
    const alias = new NgAsAliasPipe();
    const source = { x: true };

    expect(alias).toBeInstanceOf(NgAsPipe);
    expect(alias.transform<Test>(source, undefined)).toBe(source);
  });
});
