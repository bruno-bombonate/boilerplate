import { SearchParam, SearchParamValueType } from '../../interfaces/search-param-interface';
import { transformNumber } from '../transform-number/transform-number-function';
import { transformString } from '../transform-string/transform-string-function';
import { transformBoolean } from '../transform-boolean/transform-boolean-function';

export const transform = (searchParam: SearchParam, searchParamValue: any): any => {
  if (searchParam.valueType === SearchParamValueType.Number) {
    return transformNumber(searchParamValue);
  } else if (searchParam.valueType === SearchParamValueType.String) {
    return transformString(searchParamValue);
  } else if (searchParam.valueType === SearchParamValueType.Boolean) {
    return transformBoolean(searchParamValue);
  }
  return null;
}
