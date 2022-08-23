import { Directive, Input } from "@angular/core";

interface NgAsContext<T> {
  ngLet: T;
  $implicit: T;
}

@Directive({ selector: '[ngAs]' })
export class NgAsDirective<T> {
  @Input() ngAs!: T;

  /** @internal */
  public static ngLetUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `NgLet` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgLet` structural directive renders its template, the type of the expression bound
   * to `NgLet` should be narrowed in some way. For `NgLet`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgLet`.
   */
  static ngTemplateGuard_ngLet: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgLet` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgLet` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: NgAsDirective<T>, ctx: any): ctx is NgAsContext<Exclude<T, false | 0 | '' | null | undefined>> {
      return true;
  }
}