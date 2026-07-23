import { NgAsAliasPipe, NgAsPipe } from './ng-as.pipe';
import { ngAs } from './ng-as.utils';

/**
 * This library has almost no runtime: what it actually ships is a type. These
 * assertions are checked when the specs are compiled, so a regression in the
 * signatures fails the test run before a single test executes.
 */

interface Person {
  name: string;
  age: number;
}

class Animal {
  constructor(public legs: number) {}
}

type Alias = Readonly<{ id: `${number}` }>;

describe('type surface', () => {
  const pipe = new NgAsPipe();
  const alias = new NgAsAliasPipe();
  const source: unknown = { name: 'Simone', age: 40 };

  it('casts an unknown to the type of the witness', () => {
    expectTypeOf(ngAs(source, undefined as Person | undefined)).toEqualTypeOf<Person>();
    expectTypeOf(pipe.transform(source, undefined as Person | undefined)).toEqualTypeOf<Person>();
    expectTypeOf(alias.transform(source, undefined as Person | undefined)).toEqualTypeOf<Person>();
  });

  it('works with a class, not just an interface', () => {
    expectTypeOf(ngAs(source, undefined as Animal | undefined)).toEqualTypeOf<Animal>();
    expectTypeOf(ngAs(source, undefined as Animal | undefined).legs).toEqualTypeOf<number>();
  });

  it('works with a type alias, including template literal types', () => {
    expectTypeOf(ngAs(source, undefined as Alias | undefined)).toEqualTypeOf<Alias>();
    expectTypeOf(ngAs(source, undefined as Alias | undefined).id).toEqualTypeOf<`${number}`>();
  });

  it('exposes the members of the target type', () => {
    const person = ngAs(source, undefined as Person | undefined);

    expectTypeOf(person.name).toEqualTypeOf<string>();
    expectTypeOf(person.age).toEqualTypeOf<number>();
    // the whole point: a member that does not exist on Person is a compile error
    expectTypeOf(person).not.toHaveProperty('nope');
  });

  it('takes an explicit type argument instead of inferring one', () => {
    expectTypeOf(ngAs<Person>(source, undefined)).toEqualTypeOf<Person>();
    expectTypeOf(pipe.transform<Person>(source, undefined)).toEqualTypeOf<Person>();
  });

  it('does not widen the result back to unknown', () => {
    expectTypeOf(ngAs(source, undefined as Person | undefined)).not.toBeUnknown();
    expectTypeOf(ngAs(source, undefined as Person | undefined)).not.toBeAny();
  });

  it('accepts any input type, since the cast is unchecked by design', () => {
    expectTypeOf(ngAs('a string', undefined as Person | undefined)).toEqualTypeOf<Person>();
    expectTypeOf(ngAs(42, undefined as Person | undefined)).toEqualTypeOf<Person>();
    expectTypeOf(ngAs(null, undefined as Person | undefined)).toEqualTypeOf<Person>();
  });

  it('keeps the alias signature identical to the pipe it extends', () => {
    expectTypeOf<NgAsAliasPipe['transform']>().toEqualTypeOf<NgAsPipe['transform']>();
  });
});
