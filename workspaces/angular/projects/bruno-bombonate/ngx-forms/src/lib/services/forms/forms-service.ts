import { Injectable, inject } from '@angular/core';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../../injection-tokens/control-errors-injection-token';
import { CONTROL_ERROR_VISIBLE_INJECTION_TOKEN } from '../../injection-tokens/control-error-visible-injection-token';
import { ControlErrors } from '../../interfaces/control-errors-interface';
import { ControlErrorVisible } from '../../interfaces/control-error-visible-interface';
import { CONTROL_ERRORS } from '../../constants/control-errors-constant';
import { CONTROL_ERROR_VISIBLE } from '../../constants/control-error-visible-constant';

@Injectable({
  providedIn: 'root',
})
export class FormsService {

  private readonly controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });
  private readonly controlErrorVisibleInjectionToken = inject(CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });

  public readonly controlErrors: ControlErrors = {
    ...CONTROL_ERRORS,
    ...(this.controlErrorsInjectionToken ?? { })
  };

  public readonly controlErrorVisible: ControlErrorVisible = this.controlErrorVisibleInjectionToken ?? CONTROL_ERROR_VISIBLE;

}
