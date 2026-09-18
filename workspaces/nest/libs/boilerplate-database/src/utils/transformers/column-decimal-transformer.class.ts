export class ColumnDecimalTransformer {

  public to(data: number): number {
    return data;
  }

  public from(data: null | string): null | number {
    if (data !== null) {
      return +data;
    }
    return null;
  }

}
