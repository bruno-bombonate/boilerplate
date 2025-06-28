import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-reset-password-request-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent
  ],
  templateUrl: './reset-password-request-form-component.html',
  styleUrl: './reset-password-request-form-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordRequestFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      email: new FormControl<null | string>(null, [Validators.required, Validators.email])
    })
  );

}
