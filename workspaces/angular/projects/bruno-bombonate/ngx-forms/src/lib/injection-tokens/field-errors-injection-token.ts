import { InjectionToken } from '@angular/core';
import { FieldErrors } from '../interfaces/field-errors-interface';

export const FIELD_ERRORS_INJECTION_TOKEN = new InjectionToken<undefined | FieldErrors>('fieldErrors', { providedIn: 'root', factory: () => undefined });
