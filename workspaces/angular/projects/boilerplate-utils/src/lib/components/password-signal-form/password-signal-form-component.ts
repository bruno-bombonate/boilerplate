import { Component, computed, signal } from '@angular/core';
import { FormRoot, FormField, form, required, validateTree } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface PasswordSignalFormModel {
  passwordCurrent: string;
  passwordNew: string;
  passwordNewConfirmation: string;
}

@Component({
  selector: 'app-password-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './password-signal-form-component.html',
  styleUrl: './password-signal-form-component.sass'
})
export class PasswordSignalFormComponent extends SignalFormComponentClass<PasswordSignalFormModel> {

  protected override readonly formModel = signal<PasswordSignalFormModel>({
    passwordCurrent: '',
    passwordNew: '',
    passwordNewConfirmation: ''
  });

  protected override readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.passwordCurrent);
    required(schemaPath.passwordNew);
    required(schemaPath.passwordNewConfirmation);
    validateTree(schemaPath, (context) => {
      const { passwordNew, passwordNewConfirmation } = context.value();
      if (passwordNew !== '' && passwordNewConfirmation !== '' && passwordNew !== passwordNewConfirmation) {
        return { kind: 'passwordConfirmation' };
      }
      return undefined;
    });
  });

  protected readonly hasPasswordConfirmationError = computed(() =>
    this.form().errors().some((error) => error.kind === 'passwordConfirmation')
  );

}
