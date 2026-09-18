import { Component, computed, signal } from '@angular/core';
import { FormRoot, FormField, form, required, validateTree } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface ResetPasswordSignalFormModel {
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-reset-password-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './reset-password-signal-form-component.html',
  styleUrl: './reset-password-signal-form-component.sass'
})
export class ResetPasswordSignalFormComponent extends SignalFormComponentClass<ResetPasswordSignalFormModel> {

  protected override readonly formModel = signal<ResetPasswordSignalFormModel>({
    password: '',
    passwordConfirmation: ''
  });

  protected override readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.password);
    required(schemaPath.passwordConfirmation);
    validateTree(schemaPath, (context) => {
      const { password, passwordConfirmation } = context.value();
      if (password !== '' && passwordConfirmation !== '' && password !== passwordConfirmation) {
        return { kind: 'passwordConfirmation' };
      }
      return undefined;
    });
  });

  protected readonly hasPasswordConfirmationError = computed(() =>
    this.form().errors().some((error) => error.kind === 'passwordConfirmation')
  );

}
