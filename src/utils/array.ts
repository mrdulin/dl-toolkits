type BaseType = string | number | boolean | null | undefined;

function diff(a1: BaseType[], a2: BaseType[]): BaseType[] {
  return a1.concat(a2).filter((val, _, arr) => {
    return arr.indexOf(val) === arr.lastIndexOf(val);
  });
}

function diff2(a1: BaseType[], a2: BaseType[]): BaseType[] {
  return a1.filter((val) => a2.indexOf(val) === -1);
}

function removeDup(arr: BaseType[]): BaseType[] {
  return arr.filter((v, i, src) => {
    if (typeof v === 'number' && Number.isNaN(v)) {
      return src.findIndex((u) => Number.isNaN(u as number)) === i;
    }
    return src.indexOf(v) === i;
  });
}

function maxVal(arr: number[]): number {
  return Math.max.apply(null, arr);
}

function maxVal2(arr: number[]): number {
  return Math.max(...arr);
}

function swap(arr: any[], p1: number, p2: number): any[] {
  const tmp = arr[p1];
  const cArr = arr.slice();
  cArr[p1] = arr[p2];
  cArr[p2] = tmp;
  return cArr;
}

function clone(arr: any[]) {
  return arr.slice();
}

function insertElementToArrayByIndex(src: BaseType[], dest: BaseType[], rules: number[]) {
  // TODO 参数校验
  if (!src.length || !dest.length || !rules || !rules.length) {
    return src.concat(dest);
  }

  const idxArr = clone(rules).map((el: number) => el - 1);
  const tempArray = src.concat(dest);
  const destClone = clone(dest);
  const srcClone = clone(src);

  return tempArray.reduce((acc, val, idx) => {
    const findIdx = idxArr.indexOf(idx) !== -1;

    if (findIdx) {
      if (destClone.length) {
        acc[idx] = destClone.shift();
      } else {
        acc = acc.concat(srcClone);
      }
    } else {
      if (srcClone.length) {
        acc[idx] = srcClone.shift();
      }
    }

    return acc;
  }, [] as BaseType[]);
}

function insertArray(src: any[], dest: any[], idx: number, deleteCount: number) {
  const cSrc = src.slice();
  cSrc.splice(idx, deleteCount, ...dest);
  return cSrc;
}

function elementCount(arr: any[]): { [key: string]: number } {
  const countObj = {};
  arr.forEach((element) => {
    if (countObj[element]) {
      let num = countObj[element];
      num += 1;
      countObj[element] = num;
    } else {
      countObj[element] = 1;
    }
  });

  return countObj;
}

function quickSort(arr: number[]) {
  if (arr.length <= 1) {
    return arr;
  }
  const baseIndex = Math.floor(arr.length / 2);
  const baseValue = arr.splice(baseIndex, 1)[0];
  const left: number[] = [];
  const right: number[] = [];
  const len = arr.length;

  for (let i = 0; i < len; i += 1) {
    const el = arr[i];
    if (el < baseValue) {
      left.push(el);
    } else {
      right.push(el);
    }
  }

  return quickSort(left).concat([baseValue], quickSort(right));
}

/**
 *
 * 找到两个数组第一个相同的元素
 * @author dulin
 * @param {BaseType[]} a
 * @param {BaseType[]} b
 * @returns {BaseType}
 */
function findFirstSameElement(a: BaseType[], b: BaseType[]): BaseType {
  let el: BaseType;
  for (const v of a) {
    const idx = b.indexOf(v);
    if (idx !== -1) {
      el = v;
      break;
    }
  }
  return el;
}

function flatten(arr: any[]) {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

export {
  flatten,
  diff,
  diff2,
  removeDup,
  maxVal,
  maxVal2,
  swap,
  insertElementToArrayByIndex,
  insertArray,
  elementCount,
  quickSort,
  findFirstSameElement,
};
