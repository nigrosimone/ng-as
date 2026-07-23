import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgAsModule } from './ng-as.module';

interface Test {
  x: boolean;
}

describe('NgAsModule', () => {
  it('exports both the pipe and the directive from a single import', () => {
    @Component({
      template: `<ng-container
          *ngTemplateOutlet="pipeTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-container
          *ngTemplateOutlet="directiveTemplate; context: { $implicit: test }"
        ></ng-container>
        <ng-template #pipeTemplate let-test
          ><span>{{ (test | as: Test).x }}</span></ng-template
        >
        <ng-template #directiveTemplate [ngAs]="Test" let-test
          ><span>{{ test.x }}</span></ng-template
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
});
