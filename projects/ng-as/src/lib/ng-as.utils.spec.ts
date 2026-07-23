import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ngAs } from './ng-as.utils';

interface Test {
  x: boolean;
}

describe('ngAs()', () => {
  it('returns the very same reference it was given', () => {
    const source = { x: true };

    expect(ngAs<Test>(source, undefined)).toBe(source);
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
    expect(ngAs(value, undefined)).toBe(value);
  });

  it('ignores the type witness completely', () => {
    const source = { x: true };

    expect(ngAs<Test>(source, { x: false })).toBe(source);
  });

  it('can be called straight from a template, without importing anything', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="testTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #testTemplate let-test
          ><div>{{ $ngAs(test, Test).x }}</div></ng-template
        >`,
      imports: [NgTemplateOutlet],
    })
    class TestComponent {
      public Test!: Test;
      test: Test = { x: true };
      public readonly $ngAs = ngAs;
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('true');
  });
});
