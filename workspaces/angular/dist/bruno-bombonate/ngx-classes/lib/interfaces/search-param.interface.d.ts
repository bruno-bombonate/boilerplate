export declare enum SearchParamType {
    Param = "paramMap",
    QueryParam = "queryParamMap"
}
export declare enum SearchParamValueType {
    Number = "number",
    String = "string",
    Boolean = "boolean"
}
export interface SearchParam {
    name: string;
    type: SearchParamType;
    valueType: SearchParamValueType;
    valueDefault?: number | string | boolean;
}
