import { getAllStaticMethods } from '../../utils';

describe('cls', () => {
  describe('#getAllStaticMethods', () => {
    it("should get all static methods' names of a class", () => {
      class TestClass {
        public static methodA() {
          return;
        }
        public static methodB() {
          return;
        }
      }
      const actual = getAllStaticMethods(TestClass);
      expect(actual).toEqual(['methodA', 'methodB']);
    });
  });
});
