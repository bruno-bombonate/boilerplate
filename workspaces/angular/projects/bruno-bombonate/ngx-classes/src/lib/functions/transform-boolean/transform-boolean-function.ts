
export const transformBoolean = (value: any): null | boolean => {
  const valueTypeOfIsBoolean = typeof value === 'boolean';
  const valueTypeOfIsString = typeof value === 'string';
  if (valueTypeOfIsBoolean) {
    return value;
  } else if (valueTypeOfIsString) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  }
  return null;
}
