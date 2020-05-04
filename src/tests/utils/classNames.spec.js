import classNames from '../../utils/classNames';

describe('classNames', () => {
  it ('should build className correctly', () => {
    expect(classNames('hello', {
      classOne: true,
      classTwo: false
    })).toBe('hello classOne');
  });

  it('should merge objects', () => {
    expect(classNames('hello', {
      classOne: true,
      classTwo: false
    }, {
      classThree: true
    })).toBe('hello classOne classThree');
  })
})