import { ControlErrors } from '../interfaces/control-errors-interface';

export const CONTROL_ERRORS: ControlErrors = {
  required: () => 'Please fill this field.',
  requiredTrue: () => 'Please fill this field.',
  email: () => 'Please fill the email in the format: yourname@example.com.',
  pattern: () => 'Please fill this field in the correct format.',
  min: (error: any) => `Please enter a value of at least ${error.min}.`,
  max: (error: any) => `Please enter a maximum value of ${error.max}.`,
  minlength: (error: any) => `Please enter at least ${error.requiredLength} characters.`,
  maxlength: (error: any) => `Please enter a maximum of ${error.requiredLength} characters.`
};
