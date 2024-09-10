import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NgAsDirective } from './ng-as.directive';
import { NgAsPipe } from './ng-as.pipe';
import { NgAsModule } from 'ng-as';


interface Test {
    x: boolean;
}

describe('NgAsDirective', () => {

    it('ngModule directive', () => {
        @Component({
            template: `<ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
            <ng-template #testTemplate [ngAs]="Test" let-test><div>{{test.x}}</div></ng-template>`,
            standalone: true,
            imports: [NgAsModule, CommonModule]
        })
        class TestComponent {
            public Test!: Test;
            test: Test = { x: true };
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('true');
    });

    it('standalone directive', () => {
        @Component({
            template: `<ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
            <ng-template #testTemplate [ngAs]="Test" let-test><div>{{test.x}}</div></ng-template>`,
            standalone: true,
            imports: [NgAsDirective, CommonModule]
        })
        class TestComponent {
            public Test!: Test;
            test: Test = { x: true };
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('true');
    });

    it('ngModule pipe', () => {
        @Component({
            template: `<ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
            <ng-template #testTemplate let-test><div>{{(test | as:Test).x}}</div></ng-template>`,
            standalone: true,
            imports: [NgAsModule, CommonModule]
        })
        class TestComponent {
            public Test!: Test;
            test: Test = { x: true };
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('true');
    });

    it('standalone pipe', () => {
        @Component({
            template: `<ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
            <ng-template #testTemplate let-test><div>{{(test | as:Test).x}}</div></ng-template>`,
            standalone: true,
            imports: [NgAsPipe, CommonModule]
        })
        class TestComponent {
            public Test!: Test;
            test: Test = { x: true };
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('true');
    });

    it('directive ngTemplateContextGuard', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(NgAsDirective.ngTemplateContextGuard<Test>(null as any, {
            ngAs: { x: true },
            $implicit: { x: true }
        })).toBeTrue();
    });
});


