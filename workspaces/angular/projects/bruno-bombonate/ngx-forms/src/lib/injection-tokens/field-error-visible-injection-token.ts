import { InjectionToken } from '@angular/core';
import { FieldErrorVisible } from '../interfaces/field-error-visible-interface';

export const FIELD_ERROR_VISIBLE_INJECTION_TOKEN = new InjectionToken<undefined | FieldErrorVisible>('fieldErrorVisible', { providedIn: 'root', factory: () => undefined });
