import { allSequence, AnyAsyncFunc, allMap, all, allSettled } from '../../utils/promise';

describe('promise', () => {
  function asyncTask<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 10);
    });
  }

  describe('#allSequence', () => {
    it('should execute async task sequence', async () => {
      let sequence: number[] = [];
      function sequenceSpy(data: number) {
        sequence.push(data);
        return asyncTask(data);
      }
      const tasks: Array<AnyAsyncFunc<number>> = [sequenceSpy.bind(null, 1), sequenceSpy.bind(null, 2)];
      for (let i = 0; i < 100; i++) {
        const p = allSequence(tasks);
        const actual = await p;
        expect(sequence).toEqual([1, 2]);
        expect(actual).toEqual([1, 2]);
        sequence = [];
      }
    });
  });

  describe('#allMap', () => {
    it('should resolve all promise and execute map function for each resolved value', async () => {
      jest.useFakeTimers();
      const values = [1, 2, 3, 4];
      const mapFn = (v: number) => v * 100;
      const defer = allMap<number>(values, asyncTask, mapFn);
      jest.advanceTimersByTime(1000);
      const actual = await defer;
      expect(actual).toEqual([100, 200, 300, 400]);
    });
  });

  describe('#all', () => {
    it('should resolve promise if all promises resolved', async () => {
      const promises = Array.from({ length: 10 }).map((_, i) => Promise.resolve(i));
      const rs = await all(promises);
      expect(rs).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should reject all if any promise reject ', async () => {
      const promises = [Promise.resolve(1), Promise.reject(new Error('network'))];
      await expect(all(promises)).rejects.toThrowError('network');
    });
  });

  describe('#allSettled', () => {
    function fn(i: number) {
      return new Promise((resolve, reject) => {
        if (i === 2) {
          return reject('error happened');
        }
        resolve(i);
      });
    }
    it('should resolve all promise, rejected promise will have a fallback value', async () => {
      const fns = [{ p: fn(1) }, { p: fn(2), fallback: 'b' }, { p: fn(3) }];
      const actual = await allSettled(fns);
      expect(actual).toEqual([1, 'b', 3]);
    });
  });
});
