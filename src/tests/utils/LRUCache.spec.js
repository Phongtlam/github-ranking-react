import LRUCache from '../../utils/dataStructure/LRUCache.js';

describe('LRUCache', () => {
  it('should only keep X values in cache according to capacity', () => {
    const cache = new LRUCache(3);
    cache.put('one', 1);
    expect(cache.size()).toBe(1);
    cache.put('two', 1);
    expect(cache.size()).toBe(2);
    cache.put('three', 1);
    cache.put('four', 4);
    cache.put('five', 5);
    expect(cache.size()).toBe(3);
  });

  it('should invalidate least recently used data', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1);
    cache.get(1);
    cache.put(3, 3);
    cache.get(2);
    expect(cache.get(2)).toBe(null);
  });

  it('should expire the cache based on cache invalidationTimer', () => {
    const cache = new LRUCache(2, 100);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1);
    setTimeout(() => {
      expect(cache.get(1)).toBe(null);
    }, 200);
  });
});
