import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-search-form',
  imports: [
    // modules
    ReactiveFormsModule
  ],
  templateUrl: './user-search-form.component.html',
  styleUrl: './user-search-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      userId: new FormControl<null | number>(null),
      userName: new FormControl<null | string>(null),
      userEmail: new FormControl<null | string>(null),
      userStatus: new FormControl<null | boolean>(null)
    })
  );

}
