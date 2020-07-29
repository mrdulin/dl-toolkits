import { ddmmyyyy, isValidDate } from '../../utils/date';

describe('date', () => {
  describe('#ddmmyyyy', () => {
    it.each`
      date            | expected
      ${'2016/06/29'} | ${'29/06/2016'}
      ${'2016/1/1'}   | ${'01/01/2016'}
    `('should format date to dd/mm/yyyy', ({ date, expected }) => {
      expect(ddmmyyyy(date)).toEqual(expected);
    });

    it('should handle invalid date', () => {
      expect(() => ddmmyyyy('17/1/1')).toThrow('invalid date string');
    });
  });

  describe('#isValidDate', () => {
    it('should return true if date is valid', () => {
      expect(isValidDate('2016/06/29')).toBeTruthy();
    });
    it('should return false if date is invalid', () => {
      expect(isValidDate('17/1/1')).toBeFalsy();
    });
  });
});
