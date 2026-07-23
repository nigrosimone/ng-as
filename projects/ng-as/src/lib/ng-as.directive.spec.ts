import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgAsDirective } from './ng-as.directive';
import { NgAsModule } from './ng-as.module';

interface Test {
  x: boolean;
}

describe('NgAsDirective', () => {
  it('renders through the standalone directive', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate [ngAs]="Test" let-test
          ><div>{{ test.x }}</div></ng-template
        >`,
      imports: [NgAsDirective, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');
  });

  it('renders through the directive re-exported by the module', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate [ngAs]="Test" let-test
          ><div>{{ test.x }}</div></ng-template
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

  it('does not render anything on its own: the outlet drives the template', () => {
    @Component({
      template: `<ng-template [ngAs]="Test" let-test><div>never rendered</div></ng-template>`,
      imports: [NgAsDirective],
    })
    class TestComponent {
      public Test!: Test;
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('');
  });

  it('leaves the context untouched, so it also renders a nullish value', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate [ngAs]="Test" let-test
          ><div>{{ test?.x }}</div></ng-template
        >`,
      imports: [NgAsDirective, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test | null = null;
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('');
  });

  it('re-renders when the value behind the context changes', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test() }"
        ></ng-container>
        <ng-template #testTemplate [ngAs]="Test" let-test
          ><div>{{ test.x }}</div></ng-template
        >`,
      imports: [NgAsDirective, NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      readonly test = signal<Test>({ x: true });
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');

    fixture.componentInstance.test.set({ x: false });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('false');
  });

  it('exposes the input it was bound to', () => {
    @Component({
      template: `<ng-template [ngAs]="Test" let-test></ng-template>`,
      imports: [NgAsDirective],
    })
    class TestComponent {
      public Test: Test = { x: true };
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement
      .queryAllNodes(() => true)
      .map((node) => node.injector.get(NgAsDirective, null))
      .find((instance): instance is NgAsDirective<Test> => instance !== null);

    expect(directive?.ngAs).toEqual({ x: true });
  });

  it('ngTemplateContextGuard is a compile-time only assertion that always passes', () => {
    expect(
      NgAsDirective.ngTemplateContextGuard<Test>(null as unknown as NgAsDirective<Test>, {
        ngAs: { x: true },
        $implicit: { x: true },
      }),
    ).toBe(true);
    // it never inspects the context, so even a mismatching one is accepted
    expect(
      NgAsDirective.ngTemplateContextGuard<Test>(null as unknown as NgAsDirective<Test>, undefined),
    ).toBe(true);
  });
});
