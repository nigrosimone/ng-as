import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'as', pure: true })
export class NgAsPipe implements PipeTransform {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  transform<T>(input: unknown, _baseItem: T | undefined): T {
    return input as unknown as T;
  }
}