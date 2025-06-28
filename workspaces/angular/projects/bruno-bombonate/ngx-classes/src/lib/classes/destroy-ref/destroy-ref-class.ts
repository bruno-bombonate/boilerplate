import { Directive, inject, DestroyRef } from '@angular/core';

@Directive()
export class DestroyRefClass {

  public readonly destroyRef = inject(DestroyRef);

}
