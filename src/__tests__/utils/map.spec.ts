import { shallowClone, objToMap } from '../../utils/map';

describe('map', () => {
  describe('#shallowClone', () => {
    it('should shallow clone map with value is basic type', () => {
      const m = new Map([
        [1, 'novaline'],
        [2, 'emilie'],
        [3, 'emily'],
      ]);

      const actual = shallowClone(m);
      expect(actual).toEqual(
        new Map([
          [1, 'novaline'],
          [2, 'emilie'],
          [3, 'emily'],
        ]),
      );
      expect(actual).not.toBe(m);
    });

    it('should shallow clone map with value is reference type', () => {
      const m = new Map([
        [1, { name: 'novaline', age: 26 }],
        [2, { name: 'emilie', age: 28 }],
        [3, { name: 'emily', age: 15 }],
      ]);

      const actual = shallowClone(m);
      expect(actual.get(1)).toBe(m.get(1));
      expect(actual).toEqual(
        new Map([
          [1, { name: 'novaline', age: 26 }],
          [2, { name: 'emilie', age: 28 }],
          [3, { name: 'emily', age: 15 }],
        ]),
      );
      actual.get(1).name = 'mrdulin';
      expect(actual.get(1).name).toBe('mrdulin');
      expect(m.get(1)!.name).toBe('mrdulin');
      actual.set(1, { name: 'dj taka' });
      expect(actual.get(1)).toEqual({ name: 'dj taka' });
      expect(m.get(1)).toEqual({ name: 'mrdulin', age: 26 });
    });
  });

  describe('#objToMap', () => {
    it('should convert plain object to Map', () => {
      const obj = { 1: 'react', 2: 'angular', 3: 'ionic' };
      const actual = objToMap(obj);
      expect(actual).toBeInstanceOf(Map);
      expect(actual.get('1')).toBe('react');
    });
  });
});
