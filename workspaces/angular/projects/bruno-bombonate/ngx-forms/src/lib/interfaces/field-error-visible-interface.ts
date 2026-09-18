import { FieldState } from '@angular/forms/signals';

export type FieldErrorVisible = (field: FieldState<any>) => boolean;
