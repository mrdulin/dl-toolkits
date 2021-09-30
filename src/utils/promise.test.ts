import { reduce, times } from '.';

const createPromise = (args: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[${new Date().toISOString()}]args: `, args);
      resolve(args);
    }, 1000);
  });

describe('promise', () => {
  describe('times', () => {
    test('should execute async fn once by default', async () => {
      const asyncFn = jest.fn(createPromise);
      const actual = await times(() => asyncFn('data'));
      console.log(actual);
      expect(asyncFn).toBeCalledTimes(1);
    });
    test.only('should execute async three times', async () => {
      const asyncFn = jest.fn(createPromise);
      const actual = await times(() => asyncFn('data'), 3);
      console.log(actual);
      expect(asyncFn).toBeCalledTimes(3);
    });
  });
  describe('reduce', () => {
    test('should pass', async () => {
      const asyncFn = jest.fn(createPromise);
      const actual = await reduce(
        [1, 2, 3],
        (acc, cur) => {
          return asyncFn(cur).then((res) => {
            return acc + res;
          });
        },
        0,
      );
      expect(actual).toEqual(6);
    });
  });
});
