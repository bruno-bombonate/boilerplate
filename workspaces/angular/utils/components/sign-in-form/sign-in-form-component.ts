import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent
  ],
  templateUrl: './sign-in-form-component.html',
  styleUrl: './sign-in-form-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent extends FormComponentClass {

  public override readonly form = input(
    new FormGroup({
      email: new FormControl<null | string>(null, [Validators.required, Validators.email]),
      password: new FormControl<null | string>(null, [Validators.required])
    })
  );

}
