import { transform } from './transform-function';
import { SearchParamType, SearchParamValueType } from '../../interfaces/search-param-interface';

describe('transformFunction', () => {

  it('should delegate to transformNumber when valueType is Number', () => {
    const searchParam = { name: 'page', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number };
    expect(transform(searchParam, '20')).toBe(20);
  });

  it('should delegate to transformString when valueType is String', () => {
    const searchParam = { name: 'orderBy', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String };
    expect(transform(searchParam, 'userId')).toBe('userId');
  });

  it('should delegate to transformBoolean when valueType is Boolean', () => {
    const searchParam = { name: 'userStatus', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Boolean };
    expect(transform(searchParam, 'true')).toBe(true);
  });

});
