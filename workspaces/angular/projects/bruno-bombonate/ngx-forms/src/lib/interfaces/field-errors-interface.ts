import { ValidationError } from '@angular/forms/signals';

export interface FieldErrors {
  [kind: string]: (error: ValidationError.WithFieldTree) => string;
}
