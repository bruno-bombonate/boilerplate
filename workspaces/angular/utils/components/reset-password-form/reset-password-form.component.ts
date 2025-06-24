import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';
import { passwordConfirmation } from '../../validators/password-confirmation.validator';

@Component({
  selector: 'app-reset-password-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent
  ],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.sass'
})
export class ResetPasswordFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      password: new FormControl<null | string>(null, [Validators.required]),
      passwordConfirmation: new FormControl<null | string>(null, [Validators.required])
    }, { validators: passwordConfirmation('password', 'passwordConfirmation') })
  );

}
