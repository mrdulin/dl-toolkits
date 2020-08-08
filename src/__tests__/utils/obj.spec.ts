import { getValueByPath, deepMerge } from '../../utils/obj';

describe('obj', () => {
  describe('#getValueByPath', () => {
    it('should be return the value of an object specify property - t1', () => {
      const obj = {
        pet: {
          name: 'cat',
        },
      };
      const s = 'obj.pet.name';
      const actual = getValueByPath(obj, s);
      expect(actual).toBe('cat');
    });

    it('should be return the value of an object specify property - t2', () => {
      const obj = {
        pet: {
          name: 'cat',
        },
      };
      const s = 'pet.name';
      const actual = getValueByPath(obj, s);
      expect(actual).toBe('cat');
    });

    it('should be return the value of an object specify property - t3', () => {
      const obj = {
        pet: {
          name: 'cat',
        },
      };
      const s = 'name';
      const actual = getValueByPath(obj, s);
      expect(actual).toBe(undefined);
    });
  });

  describe('#deepMerge', () => {
    it('test case 1', () => {
      const target = { a: 1, b: 1 };
      const source = { c: 1 };
      expect(deepMerge(target, source)).toEqual({ a: 1, b: 1, c: 1 });
      expect(target).toBe(target);
      expect(source).toBe(source);
    });

    it('test case 2', () => {
      const target = { a: 1, b: 1 };
      const source = { a: 2, c: 1 };
      expect(deepMerge(target, source)).toEqual({ a: 2, b: 1, c: 1 });
      expect(target).toBe(target);
      expect(source).toBe(source);
    });

    it('test case 3', () => {
      const target = { a: 1, b: 1 };
      const source = { a: { name: 'cat' }, b: { name: 'dog' } };
      expect(deepMerge(target, source)).toEqual({
        a: { name: 'cat' },
        b: { name: 'dog' },
      });
    });

    it('test case 4', () => {
      const target = { a: { b: { name: 'cat' } } };
      const source = { a: { b: { name: 'dog' } } };
      expect(deepMerge(target, source)).toEqual({ a: { b: { name: 'dog' } } });
    });

    it('test case 5', () => {
      const target = { a: { b: { c: { name: 'cat' }, d: 1 } } };
      const source = { a: { b: { name: 'dog' } } };
      expect(deepMerge(target, source)).toEqual({ a: { b: { name: 'dog', c: { name: 'cat' }, d: 1 } } });
    });
  });
});
