import { v1 as uuidv1 } from 'uuid';

function consoleTime(options?: { name: string }) {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const oFunc = descriptor.value;
    const name = (options ? options.name : '') || oFunc.name || propertyKey;
    descriptor.value = async function inner(...args: any[]) {
      const uuid = uuidv1();
      const label = `${name}_${uuid}`;
      console.time(label);
      const rval = await oFunc.apply(this, args);
      console.timeEnd(label);
      return rval;
    };
  };
}

function consoleTimeStaticClass() {
  return <T extends new (...args: any[]) => {}>(constructor: T) => {
    const staticMethods = Object.keys(constructor).filter((prop) => typeof constructor[prop] === 'function');

    for (const staticMethod of staticMethods) {
      const originalStaticMethod = constructor[staticMethod];
      constructor[staticMethod] = async (...args: any[]) => {
        const uuid = uuidv1();
        const label = `${staticMethod}_${uuid}`;
        console.time(label);
        const rval = await originalStaticMethod.apply(constructor, args); // TODO: apply context
        console.timeEnd(label);
        return rval;
      };
    }

    return constructor;
  };
}

function consoleTimeClass() {
  return function traceClassDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
    const instanceMethods = Object.keys(constructor.prototype).filter(
      (prop) => typeof constructor.prototype[prop] === 'function',
    );

    for (const instanceMethod of instanceMethods) {
      const originalInstanceMethod = constructor.prototype[instanceMethod];
      constructor.prototype[instanceMethod] = async (...args: any[]) => {
        const uuid = uuidv1();
        const label = `${instanceMethod}_${uuid}`;
        console.time(label);
        const rval = await originalInstanceMethod.apply(constructor.prototype, args);
        console.timeEnd(label);
        return rval;
      };
    }

    return constructor;
  };
}

export { consoleTime, consoleTimeClass, consoleTimeStaticClass };
