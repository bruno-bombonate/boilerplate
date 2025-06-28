import { Injectable, inject } from '@angular/core';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../../injection-tokens/control-errors-injection-token';
import { ControlErrors } from '../../interfaces/control-errors-interface';
import { CONTROL_ERRORS } from '../../constants/control-errors-constant';

@Injectable({
  providedIn: 'root',
})
export class FormsService {

  private readonly controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });

  public readonly controlErrors: ControlErrors = {
    ...CONTROL_ERRORS,
    ...(this.controlErrorsInjectionToken ?? { })
  };

}
