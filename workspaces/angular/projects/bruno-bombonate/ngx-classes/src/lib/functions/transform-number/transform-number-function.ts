
export const transformNumber = (value: any): null | number => {
  const valueTypeOfIsNumber = typeof value === 'number';
  const valueTypeOfIsString = typeof value === 'string';
  const valueIsNotEmpty = value !== '';
  if (valueTypeOfIsNumber) {
    return value;
  } else if (valueTypeOfIsString && valueIsNotEmpty) {
    const valueInNumber = +value;
    const valueIsNumber = isNaN(valueInNumber) === false;
    if (valueIsNumber) {
      return valueInNumber;
    }
  }
  return null;
}
