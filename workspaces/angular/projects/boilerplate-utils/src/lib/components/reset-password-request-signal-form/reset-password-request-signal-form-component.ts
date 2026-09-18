import { Component, signal } from '@angular/core';
import { FormRoot, FormField, form, required, email } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface ResetPasswordRequestSignalFormModel {
  email: string;
}

@Component({
  selector: 'app-reset-password-request-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './reset-password-request-signal-form-component.html',
  styleUrl: './reset-password-request-signal-form-component.sass'
})
export class ResetPasswordRequestSignalFormComponent extends SignalFormComponentClass<ResetPasswordRequestSignalFormModel> {

  protected override readonly formModel = signal<ResetPasswordRequestSignalFormModel>({
    email: ''
  });

  protected override readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
  });

}
