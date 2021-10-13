describe('env', () => {
  describe('isWechat', () => {
    test('should return true if the environment is wechat and only execute once', () => {
      const ua = 'micromessenger';
      const toLowerCaseSpy = jest.spyOn(String.prototype, 'toLowerCase');
      const { isWechat } = require('./env');
      expect(isWechat(ua)).toBeTruthy();
      expect(isWechat(ua)).toBeTruthy();
      expect(toLowerCaseSpy).toBeCalledTimes(1);
    });
  });
});
