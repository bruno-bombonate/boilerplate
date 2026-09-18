import { FieldErrorVisible } from '../interfaces/field-error-visible-interface';

export const FIELD_ERROR_VISIBLE: FieldErrorVisible = (field) => {
  const fieldErrorsIsNotEmpty = field.errors().length > 0;
  const fieldTouchedIsTrue = field.touched() === true;
  const fieldDirtyIsTrue = field.dirty() === true;
  return fieldErrorsIsNotEmpty && (fieldTouchedIsTrue || fieldDirtyIsTrue);
};
