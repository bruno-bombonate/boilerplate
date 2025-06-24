import { Directive, input } from '@angular/core';

@Directive()
export class ViewComponentClass {

  public readonly item = input.required<any>();

}
