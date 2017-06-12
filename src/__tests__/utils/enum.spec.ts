import { enumKeys } from '../../utils';

enum CacheStorage {
  LOCAL_STORAGE,
  SESSION_STORAGE,
  MEMORY
}

enum Char {
  A
}

describe('CacheStorage', () => {
  it('t1', () => {
    expect(CacheStorage.LOCAL_STORAGE).toBe(0);
  });
});

describe('Char', () => {
  it('t1', () => {
    const a = Char.A;
    const nameOfA = Char[a];
    expect(nameOfA).toBe('A');
  });
});

describe('enumKeys', () => {
  it('t1', () => {
    const keys = enumKeys(CacheStorage);
    expect(keys).toEqual(['LOCAL_STORAGE', 'SESSION_STORAGE', 'MEMORY']);
  });
});
