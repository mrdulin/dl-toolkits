class A {
  public static foo(a: number, b: number, callback: (val: number) => void) {
    setTimeout(() => {
      const result = A.doSomething(a, b);
      callback(result);
    }, 1000);
  }

  private static doSomething(a: number, b: number) {
    return a + b;
  }
}

// tslint:disable-next-line: max-classes-per-file
@staticClassDecoratorFactory()
class B extends A {
  public static foo;
}

function staticClassDecoratorFactory() {
  return function staticClassDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
    const staticMethods = Object.keys(constructor).filter(prop => typeof constructor[prop] === 'function');
    for (const staticMethod of staticMethods) {
      const originalStaticMethod = constructor[staticMethod];
      constructor[staticMethod] = function(...args: any[]) {
        // args = args.filter(arg => typeof arg !== 'function');
        const rval = originalStaticMethod.apply(this, args);
        return rval;
      };
    }

    return constructor;
  };
}

(async function TestB() {
  const result = await B.foo(1, 2);
  console.log('result: ', result);
})();
