import { transformString } from './transform-string-function';

describe('transformStringFunction', () => {

  it('should return the same value when it is already a non-empty string', () => {
    expect(transformString('user')).toBe('user');
  });

  it('should convert number/boolean values to string', () => {
    expect(transformString(20)).toBe('20');
    expect(transformString(true)).toBe('true');
  });

  it('should return null for an empty string', () => {
    expect(transformString('')).toBeNull();
  });

});
