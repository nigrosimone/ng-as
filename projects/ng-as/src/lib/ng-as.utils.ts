/**
 * @description
 *
 * `ngAs()` is the plain function flavour of the `as` pipe: it casts a template
 * variable without importing anything into the component's `imports`.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```ts
 * public readonly $ngAs = ngAs;
 * ```
 *
 * ```html
 * <ng-container *ngTemplateOutlet="testTemplate; context: {$implicit: test}"></ng-container>
 * <ng-template #testTemplate let-test><div>{{$ngAs(test, Test).x}}</div></ng-template>
 * ```
 */
export const ngAs = <T>(input: unknown, _baseItem: T | undefined): T => input as T;
