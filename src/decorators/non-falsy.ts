import { DecoratorFunction } from '../utils/type-helpers';

function decoratorFactory(...parameters: string[]): DecoratorFunction<PropertyDescriptor> {
  return function nonFalsy(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    let ret: any;

    descriptor.value = function inner(...args: any[]): any {
      const passed: boolean = args.every((arg: any) => arg === undefined);

      if (!passed) {
        return;
      }

      ret = originalMethod.apply(this, args);
      return ret;
    };

    return descriptor;
  };
}

export default decoratorFactory;
