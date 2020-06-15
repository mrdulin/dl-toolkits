type DecoratorFunction<T> = (
  target: any,
  propertyKey: string,
  decriptor: T
) => T;

interface IkeyOfObject {
  [propName: string]: any;
}

export { DecoratorFunction, IkeyOfObject };
