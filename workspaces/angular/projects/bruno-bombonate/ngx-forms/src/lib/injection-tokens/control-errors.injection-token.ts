import { InjectionToken } from '@angular/core';
import { ControlErrors } from '../interfaces/control-errors.interface';

export const CONTROL_ERRORS_INJECTION_TOKEN = new InjectionToken<undefined | ControlErrors>('controlErrors', { providedIn: 'root', factory: () => undefined });
