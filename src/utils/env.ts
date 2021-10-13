import { AnyFunction } from './type-helpers';

const getUserAgent = (ua: string) => {
  console.count('getUserAgent');
  if (ua) {
    return ua.toLowerCase();
  }
  return typeof window !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
};

export const isWechat = memoize((userAgent: string) => {
  return /micromessenger/i.test(getUserAgent(userAgent));
});

function memoize(fn: AnyFunction) {
  const cache = new Map();
  return (...args: any) => {
    const cacheKey = args[0];
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const r = fn(...args);
    cache.set(cacheKey, r);
    return r;
  };
}
