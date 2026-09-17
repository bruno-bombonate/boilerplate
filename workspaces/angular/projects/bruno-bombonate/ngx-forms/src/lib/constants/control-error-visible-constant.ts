import { ControlErrorVisible } from '../interfaces/control-error-visible-interface';

export const CONTROL_ERROR_VISIBLE: ControlErrorVisible = (control) => {
  const controlErrorsIsNotNull = control.errors !== null;
  const controlTouchedIsTrue = control.touched === true;
  const controlDirtyIsTrue = control.dirty === true;
  return controlErrorsIsNotNull && (controlTouchedIsTrue || controlDirtyIsTrue);
};
