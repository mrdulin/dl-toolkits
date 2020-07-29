import {
  diff,
  diff2,
  removeDup,
  maxVal,
  maxVal2,
  swap,
  insertElementToArrayByIndex,
  insertArray,
  elementCount,
} from '../../utils/array';

describe('array', () => {
  describe('#diff', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2];

    const e = [1, true, 2, '3'];
    const f = [true, '3'];

    const tests = [
      { args: [a, b], want: [3, 4] },
      { args: [e, f], want: [1, 2] },
    ];
    it('应该返回两个数组的差集，这两个数组包含基本类型的元素', () => {
      tests.forEach((t) => {
        const actualValue = diff(t.args[0], t.args[1]);
        expect(actualValue).toEqual(t.want);
      });
    });
  });

  describe('#diff2', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2];

    const e = [1, true, 2, '3'];
    const f = [true, '3'];

    const tests = [
      { args: [a, b], want: [3, 4] },
      { args: [e, f], want: [1, 2] },
    ];
    it('应该返回两个数组的差集，这两个数组包含基本类型的元素', () => {
      tests.forEach((t) => {
        const actualValue = diff2(t.args[0], t.args[1]);
        expect(actualValue).toEqual(t.want);
      });
    });
  });

  describe('#removeDup', () => {
    it('元素全部是Number类型的数组，应该返回去除数组中重复的元素后的数组', () => {
      const numArray = [2, 2, 3, 6, 7, 7, 7, 7, 8, 9];
      expect(removeDup(numArray)).toEqual([2, 3, 6, 7, 8, 9]);
    });

    it('元素包含Number类型和String类型的数组, 应该返回去除数组中重复的元素后的数组', () => {
      const arr = [1, 1, '1', '1', 5, '6', '3', '5'];
      const result = removeDup(arr);
      expect(result).toEqual([1, '1', 5, '6', '3', '5']);
    });

    it('元素包含null和undefined类型的数组, 应该返回去除数组中重复的元素后的数组', () => {
      const arr = [null, null, 1, undefined, undefined];
      const result = removeDup(arr);
      expect(result).toEqual([null, 1, undefined]);
    });

    it('元素包含NaN、null、undefined类型的数组, 应该返回去除数组中重复的元素后的数组', () => {
      const arr = [NaN, null, NaN, null, undefined, 1, '2', undefined];
      const result = removeDup(arr);
      expect(result).toEqual([NaN, null, undefined, 1, '2']);
    });
  });

  describe('#maxVal', () => {
    it('返回数组中的最大值', () => {
      expect(maxVal([2, 2, 3, 6, 7, 7, 7, 7, 8, 9])).toEqual(9);
    });
  });

  describe('#maxVal1', () => {
    it('返回数组中的最大值', () => {
      expect(maxVal2([2, 2, 3, 6, 7, 7, 7, 7, 8, 9])).toEqual(9);
    });
  });

  describe('#swap', () => {
    it('应该交换数组两个元素的位置，该函数应该是纯函数，数组包含简单类型的元素', () => {
      const a = [1, 2, 3];
      const actualValue = swap(a, 0, 2);
      const expectValue = [3, 2, 1];
      expect(actualValue).toEqual(expectValue);
      expect(a).toBe(a);
    });

    it('应该交换数组两个元素的位置，数组包含引用类型的元素', () => {
      const b = [{ name: 'react' }, { name: 'angular' }, { name: 'rxjs' }];
      const actualValue = swap(b, 0, 2);
      const expectValue = [{ name: 'rxjs' }, { name: 'angular' }, { name: 'react' }];
      expect(actualValue).toEqual(expectValue);
      expect(b).toBe(b);
    });
  });

  describe('#insertElementToArrayByIndex', () => {
    it('test-1', () => {
      const a = [0, 0, 0];
      const b = [1, 1, 1];
      const rules = [2, 3, 6];

      const result = insertElementToArrayByIndex(a, b, rules);
      expect(result).toEqual([0, 1, 1, 0, 0, 1]);
      expect(a).toEqual([0, 0, 0]);
      expect(b).toEqual([1, 1, 1]);
      expect(rules).toEqual([2, 3, 6]);
    });

    it('test-2', () => {
      const a = [1, 2, 3];
      const b = [0, 0, 0];
      const rules = [4, 5, 6];

      const result = insertElementToArrayByIndex(a, b, rules);

      expect(result).toEqual([1, 2, 3, 0, 0, 0]);
      expect(a).toEqual([1, 2, 3]);
      expect(b).toEqual([0, 0, 0]);
      expect(rules).toEqual([4, 5, 6]);
    });

    it('test-3', () => {
      const a = [];
      const b = [1, 2, 3];
      const rules = [];
      const result = insertElementToArrayByIndex(a, b, rules);

      expect(result).toEqual([1, 2, 3]);
      expect(a).toEqual([]);
      expect(b).toEqual([1, 2, 3]);
      expect(rules).toEqual([]);
    });

    it('test-4', () => {
      const a = [1, 2];
      const b = [4, 5];
      const rules = [2, 3];

      const result = insertElementToArrayByIndex(a, b, rules);
      expect(result).toEqual([1, 4, 5, 2]);
      expect(a).toEqual([1, 2]);
      expect(b).toEqual([4, 5]);
      expect(rules).toEqual([2, 3]);
    });

    it('test-5', () => {
      const a = [1];
      const b = [0, 0];
      const rules = [1, 2, 3];

      const result = insertElementToArrayByIndex(a, b, rules);
      expect(result).toEqual([0, 0, 1]);
      expect(a).toEqual([1]);
      expect(b).toEqual([0, 0]);
      expect(rules).toEqual([1, 2, 3]);
    });
  });

  describe('#insertArray', () => {
    it('给指定数组的指定位置插入另外一个数组', () => {
      const src = [1, 1, 1, 1];
      const dest = [0, 0, 0];
      const result = insertArray(src, dest, 1, 0);
      expect(result).toEqual([1, 0, 0, 0, 1, 1, 1]);
    });

    it('删除指定数组的指定位置以后的2个元素，随后插入另外一个数组', () => {
      const src = [1, 1, 1, 1];
      const dest = [0, 0, 0];
      const result = insertArray(src, dest, 1, 2);
      expect(result).toEqual([1, 0, 0, 0, 1]);
    });
  });

  describe('#elementCount', () => {
    it('should return correct count for each number element in array', () => {
      const numArray = [2, 2, 3, 6, 7, 7, 7, 7, 8, 9];

      const expected = {
        2: 2,
        3: 1,
        6: 1,
        7: 4,
        8: 1,
        9: 1,
      };

      expect(elementCount(numArray)).toEqual(expected);
    });
  });
});
