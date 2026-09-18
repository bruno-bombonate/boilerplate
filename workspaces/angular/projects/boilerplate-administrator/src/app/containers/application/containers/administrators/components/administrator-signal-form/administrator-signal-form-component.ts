import { Component, computed, signal } from '@angular/core';
import { FormRoot, FormField, form, required, email, disabled, validateTree } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { DatePipe } from '@angular/common';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface AdministratorSignalFormModel {
  name: string;
  email: string;
  password: {
    password: string;
    passwordConfirmation: string;
  };
  status: string;
}

@Component({
  selector: 'app-administrator-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent,
    // pipes
    DatePipe,
  ],
  templateUrl: './administrator-signal-form-component.html',
  styleUrl: './administrator-signal-form-component.sass',
})
export class AdministratorSignalFormComponent extends SignalFormComponentClass<AdministratorSignalFormModel> {

  protected override readonly formModel = signal<AdministratorSignalFormModel>({
    name: '',
    email: '',
    password: {
      password: '',
      passwordConfirmation: ''
    },
    status: ''
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

    required(schemaPath.status);

  });

  protected readonly hasPasswordConfirmationError = computed(() =>
    this.form.password().errors().some((error) => error.kind === 'passwordConfirmation')
  );

  protected override mapInputValue(value: any): Partial<AdministratorSignalFormModel> {
    return {
      name: value.name,
      email: value.email,
      status: value.status === true ? 'true' : value.status === false ? 'false' : ''
    };
  }

  protected override mapOutputValue(value: AdministratorSignalFormModel): any {
    const valueMapped: any = {
      name: value.name,
      email: value.email,
      status: value.status === 'true'
    };
    if (this.form.password().disabled() === false) {
      valueMapped.password = value.password.password;
    }
    return valueMapped;
  }

}
