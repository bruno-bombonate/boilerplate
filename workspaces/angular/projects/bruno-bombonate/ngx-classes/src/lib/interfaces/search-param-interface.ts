
export enum SearchParamType {
  Param = 'paramMap',
  QueryParam = 'queryParamMap'
}

export enum SearchParamValueType {
  Number = 'number',
  String = 'string',
  Boolean = 'boolean'
}

export interface SearchParam {
  name: string;
  type: SearchParamType;
  valueType: SearchParamValueType;
  valueDefault?: number | string | boolean;
}
