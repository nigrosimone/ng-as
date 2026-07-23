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

/**
 * @description
 *
 * `ngAs` is the prefixed name of the {@link NgAsPipe} `as` pipe: same behaviour, same
 * arguments, only the template name differs. `as` is short but it is a global,
 * collision-prone name; reach for this one when it clashes with another library or
 * when you prefer the prefixed convention.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
 * <ng-template #testTemplate let-test><div>{{(test | ngAs:Test).x}}</div></ng-template>
 * ```
 */
@Pipe({ name: 'ngAs', pure: true, standalone: true })
export class NgAsAliasPipe extends NgAsPipe implements PipeTransform {}
