import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-administrator-search-form',
  imports: [
    // modules
    ReactiveFormsModule
  ],
  templateUrl: './administrator-search-form.component.html',
  styleUrl: './administrator-search-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorSearchFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      administratorId: new FormControl<null | number>(null),
      administratorName: new FormControl<null | string>(null),
      administratorEmail: new FormControl<null | string>(null),
      administratorStatus: new FormControl<null | boolean>(null)
    })
  );

}
