import { Component, signal } from '@angular/core';
import { FormRoot, FormField, form, required, email } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface SignInSignalFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './sign-in-signal-form-component.html',
  styleUrl: './sign-in-signal-form-component.sass'
})
export class SignInSignalFormComponent extends SignalFormComponentClass<SignInSignalFormModel> {

  protected override readonly formModel = signal<SignInSignalFormModel>({
    email: '',
    password: ''
  });

  protected override readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
  });

}
