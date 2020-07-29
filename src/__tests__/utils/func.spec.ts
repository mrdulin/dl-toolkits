import { partial } from '../../utils/func';
import { curry } from 'lodash';

describe('func', () => {
  describe('#partial', () => {
    it('should return partial function and get correct returned value after executing it', () => {
      function multiply(x: number, y: number) {
        return x * y;
      }
      const fn = partial(multiply, 2);
      const actual = fn(2);
      expect(actual).toEqual(4);
    });
  });

  describe('#curry', () => {
    it('should curry function', () => {
      const add = (a: number, b: number) => a + b;
      const fn = curry(add);
      const actual = fn(1)(2);
      expect(actual).toBe(3);
    });
  });
});
