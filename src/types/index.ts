type DecoratorFunction<T> = (target: any, propertyKey: string, decriptor: T) => T;

interface IkeyOfObject {
  [propName: string]: any;
}

type ClassType<T> = new () => T;

/**
 * pick method signature type from an interface
 */
type PickMethod<T, MethodName extends keyof T> = T[MethodName] extends (...args: any[]) => any
  ? (...args: Parameters<T[MethodName]>) => ReturnType<T[MethodName]>
  : never;

export { DecoratorFunction, IkeyOfObject, PickMethod, ClassType };
