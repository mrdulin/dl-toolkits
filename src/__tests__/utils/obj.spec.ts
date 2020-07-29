import { getValueByPath } from '../../utils/obj';

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
});
