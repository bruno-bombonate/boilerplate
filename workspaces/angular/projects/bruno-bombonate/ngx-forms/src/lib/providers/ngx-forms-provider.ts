import { Provider } from '@angular/core';
import { NgxFormsConfig } from '../interfaces/ngx-forms-config-interface';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../injection-tokens/control-errors-injection-token';
import { CONTROL_ERROR_VISIBLE_INJECTION_TOKEN } from '../injection-tokens/control-error-visible-injection-token';

export const provideNgxForms = (config: NgxFormsConfig): Provider[] => {

  const providers: Provider[] = [];

  if (config.controlErrors !== undefined) {
    providers.push({ provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config.controlErrors });
  }

  if (config.controlErrorVisible !== undefined) {
    providers.push({ provide: CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.controlErrorVisible });
  }

  return providers;

};
