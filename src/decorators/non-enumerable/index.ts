/**
 * @desc 装饰器 - 将被装饰的属性设置为不可枚举
 * @param target: Person类
 * @param propertyKey: 被装饰的目标属性的名称
 * @param descriptor: 目标属性的描述符
 */
function nonenumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  // kidCount属性不可枚举
  descriptor.enumerable = false;
  console.log('name: ', propertyKey);
  return descriptor;
}

export { nonenumerable };
