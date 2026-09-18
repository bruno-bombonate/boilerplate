import { Service, inject } from '@angular/core';
import { CONTROL_ERRORS_INJECTION_TOKEN } from '../../injection-tokens/control-errors-injection-token';
import { CONTROL_ERROR_VISIBLE_INJECTION_TOKEN } from '../../injection-tokens/control-error-visible-injection-token';
import { FIELD_ERRORS_INJECTION_TOKEN } from '../../injection-tokens/field-errors-injection-token';
import { FIELD_ERROR_VISIBLE_INJECTION_TOKEN } from '../../injection-tokens/field-error-visible-injection-token';
import { ControlErrors } from '../../interfaces/control-errors-interface';
import { ControlErrorVisible } from '../../interfaces/control-error-visible-interface';
import { FieldErrors } from '../../interfaces/field-errors-interface';
import { FieldErrorVisible } from '../../interfaces/field-error-visible-interface';
import { CONTROL_ERRORS } from '../../constants/control-errors-constant';
import { CONTROL_ERROR_VISIBLE } from '../../constants/control-error-visible-constant';
import { FIELD_ERRORS } from '../../constants/field-errors-constant';
import { FIELD_ERROR_VISIBLE } from '../../constants/field-error-visible-constant';

@Service()
export class FormsService {

  private readonly controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });
  private readonly controlErrorVisibleInjectionToken = inject(CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });
  private readonly fieldErrorsInjectionToken = inject(FIELD_ERRORS_INJECTION_TOKEN, { optional: true });
  private readonly fieldErrorVisibleInjectionToken = inject(FIELD_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });

  public readonly controlErrors: ControlErrors = {
    ...CONTROL_ERRORS,
    ...(this.controlErrorsInjectionToken ?? { })
  };

  public readonly controlErrorVisible: ControlErrorVisible = this.controlErrorVisibleInjectionToken ?? CONTROL_ERROR_VISIBLE;

  public readonly fieldErrors: FieldErrors = {
    ...FIELD_ERRORS,
    ...(this.fieldErrorsInjectionToken ?? { })
  };

  public readonly fieldErrorVisible: FieldErrorVisible = this.fieldErrorVisibleInjectionToken ?? FIELD_ERROR_VISIBLE;

}
