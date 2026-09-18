import { Component, computed, signal } from '@angular/core';
import { FormRoot, FormField, form, required, email, disabled, validateTree } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface SignUpSignalFormModel {
  name: string;
  email: string;
  password: {
    password: string;
    passwordConfirmation: string;
  };
}

@Component({
  selector: 'app-sign-up-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './sign-up-signal-form-component.html',
  styleUrl: './sign-up-signal-form-component.sass'
})
export class SignUpSignalFormComponent extends SignalFormComponentClass<SignUpSignalFormModel> {

  protected override readonly formModel = signal<SignUpSignalFormModel>({
    name: '',
    email: '',
    password: {
      password: '',
      passwordConfirmation: ''
    }
  });

  protected override readonly form = form(this.formModel, (schemaPath) => {

    required(schemaPath.name);

    required(schemaPath.email);
    email(schemaPath.email);

    disabled(schemaPath.password, () => this.formData() !== undefined);
    required(schemaPath.password.password);
    required(schemaPath.password.passwordConfirmation);
    validateTree(schemaPath.password, (context) => {
      const { password, passwordConfirmation } = context.value();
      if (password !== '' && passwordConfirmation !== '' && password !== passwordConfirmation) {
        return { kind: 'passwordConfirmation' };
      }
      return undefined;
    });

  });

  protected readonly hasPasswordConfirmationError = computed(() =>
    this.form.password().errors().some((error) => error.kind === 'passwordConfirmation')
  );

  protected override mapOutputValue(value: SignUpSignalFormModel): any {
    const valueMapped: any = {
      name: value.name,
      email: value.email
    };
    if (this.form.password().disabled() === false) {
      valueMapped.password = value.password.password;
    }
    return valueMapped;
  }

}
