import { FieldErrors } from '../interfaces/field-errors-interface';

export const FIELD_ERRORS: FieldErrors = {
  required: (error: any) => error.message ?? 'Please fill this field.',
  email: (error: any) => error.message ?? 'Please fill the email in the format: yourname@example.com.',
  pattern: (error: any) => error.message ?? 'Please fill this field in the correct format.',
  min: (error: any) => error.message ?? `Please enter a value of at least ${error.min}.`,
  max: (error: any) => error.message ?? `Please enter a maximum value of ${error.max}.`,
  minLength: (error: any) => error.message ?? `Please enter at least ${error.minLength} characters.`,
  maxLength: (error: any) => error.message ?? `Please enter a maximum of ${error.maxLength} characters.`
};
