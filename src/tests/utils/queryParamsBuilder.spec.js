import queryParamsBuilder from '../../utils/queryParamsBuilder.js';

describe('queryParamsBuilder', () => {
  it('should decode correctly', () => {
    expect(
      queryParamsBuilder({
        'ABC abc 123': 'abc spaces',
        test: 'testVal',
        '#': '%23',
      })
    ).toBe('ABC%20abc%20123=abc%20spaces&test=testVal&%23=%2523');
  });
});
