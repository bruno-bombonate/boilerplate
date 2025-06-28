import { Provider } from '@angular/core';
import { ControlErrors } from '../interfaces/control-errors-interface';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../injection-tokens/control-errors-injection-token';

export const provideNgxForms = (config: ControlErrors): Provider[] => {
  return [
    { provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config }
  ];
}
