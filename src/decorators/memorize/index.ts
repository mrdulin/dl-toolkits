import isEqual from 'lodash/isEqual';

function memorize(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  let prevArgs;
  let result;
  let shouldExecute = true;

  descriptor.value = function(...args) {
    shouldExecute = !isEqual(args, prevArgs);
    if (shouldExecute) {
      result = originalMethod.apply(this, args);
      prevArgs = args;
      return result;
    } else {
      return result;
    }
  };
}

export { memorize };
