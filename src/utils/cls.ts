import { ClassType } from '../types';

function getAllStaticMethods<T>(cls: ClassType<T>): string[] {
  return Object.getOwnPropertyNames(cls).filter((fn) => typeof cls[fn] === 'function');
}

export { getAllStaticMethods };
