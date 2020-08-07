type AnyFunc = (...args: any[]) => any;
/**
 * 偏函数应用是指将一个拥有多个参数的原函数包裹，随后返回一个接受少量参数的新函数。
 *
 * @author dulin
 * @param {AnyFunc} fn
 * @param {...any[]} args
 * @returns {AnyFunc}
 */
function partial(fn: AnyFunc, ...args: any[]): AnyFunc {
  return function inner(this: void) {
    const combineArgs = args.concat([].slice.call(arguments, 0));
    return fn.apply(this, combineArgs);
  };
}

/**
 * 函数curry是将一个接受多个参数的函数转变为一组支持链式调用的函数链，其中每个函数仅有一个入参。
 * 例如，函数add(1,2,3)在经过科里化后调用方式将变为add(1)(2)(3)
 *
 * @author dulin
 * @param {AnyFunc} fn
 * @returns {AnyFunc}
 */
function curry(fn: AnyFunc): AnyFunc {
  return function inner(this: void, ...args: any[]) {
    if (args.length === 0) {
      return inner;
    } else {
      return (...args2: any[]) => fn.apply(this, args.concat(args2));
    }
  };
}

function getFuncName(func: AnyFunc): string {
  if (func.name) {
    return func.name;
  }
  let ret = func.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

export { partial, curry, getFuncName };
