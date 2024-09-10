import { Pipe, PipeTransform } from "@angular/core";

  /**
   * @description
   *
   * The `ngAs` pipe it's a Angular pipe for type casting template variables.
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
@Pipe({ name: 'as', pure: true, standalone: true })
export class NgAsPipe implements PipeTransform {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  transform<T>(input: unknown, _baseItem: T | undefined): T {
    return input as unknown as T;
  }
}