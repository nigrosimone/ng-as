import { Directive, Input } from "@angular/core";

interface NgAsContext<T> {
  ngAs: T;
  $implicit: T;
}

@Directive({ selector: '[ngAs]' })
export class NgAsDirective<T> {
  @Input() ngAs!: T;

  /**
   * Asserts the correct type of the context for the template that `ngAs` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `ngAs` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: NgAsDirective<T>, ctx: any): ctx is NgAsContext<T> {
      return true;
  }
}