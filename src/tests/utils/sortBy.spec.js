import sortBy from '../../utils/sortBy.js';

describe('sortBy util', () => {
  const data = [
    { id: 2, counter: 4 },
    { id: 1, counter: 5 },
    { id: 5, counter: 1 },
    { id: 4, counter: 2 },
    { id: 3, counter: 3 },
  ];
  it('should sort by a value in descending order', () => {
    expect(sortBy(data, 'id', true)).toStrictEqual([
      { id: 5, counter: 1 },
      { id: 4, counter: 2 },
      { id: 3, counter: 3 },
      { id: 2, counter: 4 },
      { id: 1, counter: 5 },
    ]);
  });

  it('should sort by a value in ascending order', () => {
    expect(sortBy(data, 'id', false)).toStrictEqual([
      { id: 1, counter: 5 },
      { id: 2, counter: 4 },
      { id: 3, counter: 3 },
      { id: 4, counter: 2 },
      { id: 5, counter: 1 },
    ]);
  });
});
