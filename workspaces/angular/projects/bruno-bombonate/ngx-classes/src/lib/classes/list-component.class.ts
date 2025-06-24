import { Directive, input } from '@angular/core';
import { DestroyRefClass } from './destroy-ref.class';

@Directive()
export class ListComponentClass extends DestroyRefClass {

  public readonly list = input<any[]>([]);

}
