type AnyAsyncFunc<T> = (...args: any[]) => Promise<T>;

async function allSequence<T>(tasks: Array<AnyAsyncFunc<T>>): Promise<T[]> {
  const r: T[] = [];
  for (const t of tasks) {
    r.push(await t());
  }
  return r;
}

async function allMap<T>(
  values: number[],
  task: AnyAsyncFunc<T>,
  mapFn: (v: T, i: number, src: T[]) => any,
): Promise<any> {
  const tasks = values.map(task);
  return Promise.all(tasks).then((vals) => vals.map(mapFn));
}

/**
 *
 * equivalent to Promise.all
 *
 * @author dulin
 * @template T
 * @param {Array<Promise<T>>} ps
 * @returns {Promise<T[]>}
 */
async function all<T>(ps: Array<Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    let count = 0;
    const values: T[] = [];
    for (let i = 0; i < ps.length; i++) {
      Promise.resolve(ps[i])
        .then((value) => {
          count--;
          values[i] = value;
          if (count === 0) {
            resolve(values);
          }
        })
        .catch(reject);
      count++;
    }
  });
}

interface IPromiseWithFallback<T, F = any> {
  p: Promise<T>;
  fallback?: F;
}
/**
 * if the promise is rejected, convert it to a fulfilled promise, the value will be the fallback value
 * 有一个promise reject，不会导致整个promise.all reject, 可以在catch中返回一些值，作为异步操作失败后回退的结果
 *
 * @author dulin
 * @template T
 * @param {Array<IPromiseWithFallback<T>>} ps
 * @returns
 */
async function allSettled<T>(ps: Array<IPromiseWithFallback<T>>) {
  return Promise.all(ps.map((p: IPromiseWithFallback<T>) => p.p.catch((_) => p.fallback)));
}

const times = Object.assign(
  (fn: (...args: any) => Promise<any>, n: number = 1) => {
    if (n === 0) {
      return times.results;
    }
    return fn().then((res) => {
      times.results.push(res);
      return times(fn, --n);
    });
  },
  { results: [] as any[] },
);

function reduce(args: any[], reducer: (acc: any, cur: any, idx: number) => Promise<any>, init: any) {
  return args.reduce((acc, ...rest) => {
    return acc.then((val: any) => reducer.apply(null, [val, ...rest]));
  }, Promise.resolve(init));
}

export { allSequence, AnyAsyncFunc, allMap, all, allSettled, times, reduce };
