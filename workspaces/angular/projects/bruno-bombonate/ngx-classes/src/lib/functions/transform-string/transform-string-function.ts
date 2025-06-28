
export const transformString = (value: any): null | string => {
  const valueTypeOfIsNumber = typeof value === 'number';
  const valueTypeOfIsBoolean = typeof value === 'boolean';
  const valueIsNotEmpty = value !== '';
  if (valueTypeOfIsNumber) {
    return value.toString();
  } else if (valueTypeOfIsBoolean) {
    return value.toString();
  } else if (valueIsNotEmpty) {
    return value;
  }
  return null;
}
