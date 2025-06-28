import { Directive, input } from '@angular/core';
import { DestroyRefClass } from '../destroy-ref/destroy-ref-class';

@Directive()
export class ViewComponentClass extends DestroyRefClass {

  public readonly item = input.required<any>();

}
