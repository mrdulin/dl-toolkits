import { findFirstSameElement } from './array';

function getValueByPath(obj: object, str: string) {
  if (!isObject(obj)) {
    return obj;
  }
  const strArr = str.split('.');
  const objKeys = Object.keys(obj);
  const rootKey = findFirstSameElement(objKeys, strArr) as string;
  const idx = strArr.indexOf(rootKey);
  const rootValue = obj[rootKey];
  const subStr = strArr.slice(idx).join('.');
  return getValueByPath(rootValue, subStr);
}

function isObject(obj: object) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function deepMerge(target: object, source: object) {
  const result = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    // 遍历source中的key
    for (const key in source) {
      // 排除原型上的key
      if (source.hasOwnProperty(key)) {
        // source[key]是对象
        if (isObject(source[key])) {
          // target中不包含source的key
          if (!target[key]) {
            Object.assign(result, { [key]: source[key] });

            // target中包含source的key, 使用target[key]和source[key]做递归merge
          } else {
            if (isObject(target[key])) {
              result[key] = deepMerge(target[key], source[key]);
            } else {
              Object.assign(result, { [key]: source[key] });
            }
          }
          // source[key]不是对象也不是数组, source[key]覆盖target[key]
        } else {
          Object.assign(result, { [key]: source[key] });
        }
      }
    }
  }
  return result;
}

export { getValueByPath, deepMerge };
