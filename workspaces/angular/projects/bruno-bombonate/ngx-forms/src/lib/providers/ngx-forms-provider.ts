import { Provider } from '@angular/core';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NgxFormsConfig } from '../interfaces/ngx-forms-config-interface';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../injection-tokens/control-errors-injection-token';
import { CONTROL_ERROR_VISIBLE_INJECTION_TOKEN } from '../injection-tokens/control-error-visible-injection-token';
import { FIELD_ERRORS_INJECTION_TOKEN } from '../injection-tokens/field-errors-injection-token';
import { FIELD_ERROR_VISIBLE_INJECTION_TOKEN } from '../injection-tokens/field-error-visible-injection-token';

export const provideNgxForms = (config: NgxFormsConfig = { }): Provider[] => {

  // Signal Forms, unlike Reactive Forms, doesn't apply ng-valid/ng-invalid/ng-touched/etc.
  // classes by default - registered unconditionally so consumers of SignalFormComponentClass
  // (@bruno-bombonate/ngx-classes) get the same CSS hooks Reactive Forms provides out of the box.
  const providers: Provider[] = [
    ...provideSignalFormsConfig({
      classes: {
        'ng-valid': (formField) => formField.state().valid(),
        'ng-invalid': (formField) => formField.state().invalid(),
        'ng-touched': (formField) => formField.state().touched(),
        'ng-untouched': (formField) => formField.state().touched() === false,
        'ng-dirty': (formField) => formField.state().dirty(),
        'ng-pristine': (formField) => formField.state().dirty() === false
      }
    })
  ];

  if (config.controlErrors !== undefined) {
    providers.push({ provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config.controlErrors });
  }

  if (config.controlErrorVisible !== undefined) {
    providers.push({ provide: CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.controlErrorVisible });
  }

  if (config.fieldErrors !== undefined) {
    providers.push({ provide: FIELD_ERRORS_INJECTION_TOKEN, useValue: config.fieldErrors });
  }

  if (config.fieldErrorVisible !== undefined) {
    providers.push({ provide: FIELD_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.fieldErrorVisible });
  }

  return providers;

};
