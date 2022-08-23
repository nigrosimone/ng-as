
import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAsDirective } from './ng-as.directive';
import { NgAsModule } from './ng-as.module';
import { NgAsPipe } from './ng-as.pipe';
import { ngAs } from './ng-as.utils';

interface Test {
    x: boolean;
}

describe('NgAsPipe', () => {
    it('transform', () => {
        let Test!: Test;
        const pipe = new NgAsPipe();
        expect(pipe.transform({ x: true }, Test)).toEqual({ x: true });
    });
});

describe('NgAsMethod', () => {
    it('ngAs', () => {
        let Test!: Test;
        expect(ngAs({ x: true }, Test)).toEqual({ x: true });
    });
});

@Component({
    template: `<ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
    <ng-template #testTemplate [ngAs]="Test" let-test><div>{{test.x}}</div></ng-template>` 
})
class TestComponent {
    public Test!: Test;
    test: Test = { x: true };
}
describe('NgAsDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CommonModule, NgAsModule]
        });
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test', () => {
        fixture.detectChanges();
        expect(element.textContent).toBe('true');
    });

    it('ngTemplateContextGuard', () => {
        expect(NgAsDirective.ngTemplateContextGuard(null as any, null)).toBeTrue();
    });
});

describe('NgAsModule', () => {
    it('should create NgAsModule', () => {
        expect(new NgAsModule()).toBeTruthy();
    });
});
