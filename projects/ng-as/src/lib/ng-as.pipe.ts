import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 *
 * The `as` pipe it's a Angular pipe for type casting template variables.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
 * <ng-template #testTemplate let-test><div>{{(test | as:Test).x}}</div></ng-template>
 * ```
 */
@Pipe({ name: 'as', pure: true, standalone: true })
export class NgAsPipe implements PipeTransform {
  /**
   * @description
   *
   * The `as` pipe it's a Angular pipe for type casting template variables.
   *
   * @usageNotes
   *
   * ### Usage
   *
   * ```html
   * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
   * <ng-template #testTemplate let-test><div>{{(test | as:Test).x}}</div></ng-template>
   * ```
   */
  transform<T>(input: unknown, _baseItem: T | undefined): T {
    return input as T;
  }
}
