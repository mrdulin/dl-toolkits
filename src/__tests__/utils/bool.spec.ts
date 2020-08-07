import { toBool } from '../../utils/bool';

describe('bool', () => {
  describe('#toBool', () => {
    it('should convert string to boolean', () => {
      expect(toBool('false')).toBeTruthy();
      expect(toBool('')).toBeFalsy();
    });
    it('should convert number to boolean', () => {
      expect(toBool(1)).toBeTruthy();
      expect(toBool(0)).toBeFalsy();
      expect(toBool(-1)).toBeTruthy();
      expect(toBool(Infinity)).toBeTruthy();
      expect(toBool(-Infinity)).toBeTruthy();
    });
    it('should convert null to boolean', () => {
      expect(toBool(null)).toBeFalsy();
    });
    it('should convert undefined to boolean', () => {
      expect(toBool(undefined)).toBeFalsy();
    });
    it('should convert NaN to boolean', () => {
      expect(toBool(NaN)).toBeFalsy();
    });
    it('should convert object to boolean', () => {
      expect(toBool({})).toBeTruthy();
    });
    it('should convert array to boolean', () => {
      expect(toBool([])).toBeTruthy();
    });
  });
});
