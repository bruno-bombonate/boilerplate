import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';
import { passwordConfirmation } from '../../validators/password-confirmation.validator';

@Component({
  selector: 'app-password-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      passwordCurrent: new FormControl<null | string>(null, [Validators.required]),
      passwordNew: new FormControl<null | string>(null, [Validators.required]),
      passwordNewConfirmation: new FormControl<null | string>(null, [Validators.required])
    }, { validators: passwordConfirmation('passwordNew', 'passwordNewConfirmation') })
  );

}
