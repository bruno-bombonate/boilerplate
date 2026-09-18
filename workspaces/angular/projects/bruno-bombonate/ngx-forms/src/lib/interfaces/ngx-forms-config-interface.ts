import { ControlErrors } from './control-errors-interface';
import { ControlErrorVisible } from './control-error-visible-interface';
import { FieldErrors } from './field-errors-interface';
import { FieldErrorVisible } from './field-error-visible-interface';

export interface NgxFormsConfig {
  controlErrors?: ControlErrors;
  controlErrorVisible?: ControlErrorVisible;
  fieldErrors?: FieldErrors;
  fieldErrorVisible?: FieldErrorVisible;
}
