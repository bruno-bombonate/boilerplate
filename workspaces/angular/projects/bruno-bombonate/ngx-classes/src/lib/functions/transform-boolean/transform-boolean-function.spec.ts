import { transformBoolean } from './transform-boolean-function';

describe('transformBooleanFunction', () => {

  it('should return the same value when it is already a boolean', () => {
    expect(transformBoolean(true)).toBe(true);
    expect(transformBoolean(false)).toBe(false);
  });

  it('should convert the strings "true"/"false" to boolean', () => {
    expect(transformBoolean('true')).toBe(true);
    expect(transformBoolean('false')).toBe(false);
  });

  it('should return null for anything else', () => {
    expect(transformBoolean('other')).toBeNull();
    expect(transformBoolean(undefined)).toBeNull();
  });

});
