import { InjectionToken } from '@angular/core';
import { ControlErrorVisible } from '../interfaces/control-error-visible-interface';

export const CONTROL_ERROR_VISIBLE_INJECTION_TOKEN = new InjectionToken<undefined | ControlErrorVisible>('controlErrorVisible', { providedIn: 'root', factory: () => undefined });
