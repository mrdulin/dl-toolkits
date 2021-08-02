export type DecoratorFunction<T> = (target: any, propertyKey: string, decriptor: T) => T;

export interface IkeyOfObject {
  [propName: string]: any;
}

export type ClassType<T> = new () => T;

/**
 * pick method signature type from an interface
 */
export type PickMethod<T, MethodName extends keyof T> = T[MethodName] extends (...args: any[]) => any
  ? (...args: Parameters<T[MethodName]>) => ReturnType<T[MethodName]>
  : never;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type MakeRequired<T extends object, Prop extends keyof T> = Omit<T, Prop> & Record<Prop, Required<T[Prop]>>;
