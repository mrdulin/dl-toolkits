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

export { getValueByPath };
