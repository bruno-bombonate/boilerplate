import { transformNumber } from './transform-number-function';

describe('transformNumberFunction', () => {

  it('should return the same value when it is already a number', () => {
    expect(transformNumber(20)).toBe(20);
  });

  it('should convert a numeric string to number', () => {
    expect(transformNumber('20')).toBe(20);
  });

  it('should return null for an empty string or a non-numeric string', () => {
    expect(transformNumber('')).toBeNull();
    expect(transformNumber('abc')).toBeNull();
  });

});
