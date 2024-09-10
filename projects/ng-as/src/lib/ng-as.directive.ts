import { Directive, Input } from "@angular/core";

interface NgAsContext<T> {
  ngAs: T;
  $implicit: T;
}

/**
 * @description
 *
 * The `ngAs` directive it's a Angular directive for type casting template variables.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
 * <ng-template #testTemplate [ngAs]="Test" let-test><div>{{test.x}}</div></ng-template>
 * ```
 */
@Directive({ selector: '[ngAs]', standalone: true })
export class NgAsDirective<T> {

  /**
   * @description
   *
   * The `ngAs` directive it's a Angular directive for type casting template variables.
   *
   * @usageNotes
   *
   * ### Usage
   *
   * ```html
   * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
   * <ng-template #testTemplate [ngAs]="Test" let-test><div>{{test.x}}</div></ng-template>
   * ```
   */
  @Input() ngAs!: T;


  /**
   * Asserts the correct type of the context for the template that `NgAs` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgAs` structural directive renders its template with a specific context type.
   * 
   * @see https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ngTemplateContextGuard<T>(dir: NgAsDirective<T>, ctx: any): ctx is NgAsContext<T> {
    return true;
  }
}