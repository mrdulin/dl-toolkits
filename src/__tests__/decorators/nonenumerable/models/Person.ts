import { nonenumerable } from '../../../../decorators/non-enumerable';

class Person {
  @nonenumerable
  public getKidCount(): number {
    return 42;
  }

  public getAge(): number {
    return 23;
  }
}

export { Person };
