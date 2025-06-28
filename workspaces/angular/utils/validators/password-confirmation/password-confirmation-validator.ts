import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export const passwordConfirmation = (passwordControlName: string, passwordConfirmationControlName: string): ValidatorFn => {
  return (abstractControl: AbstractControl): null | Validators => {
    const formGroup = abstractControl as FormGroup;
    const passwordFormControl = formGroup.controls[passwordControlName];
    const passwordConfirmationFormControl = formGroup.controls[passwordConfirmationControlName];
    if (passwordFormControl.valid && passwordConfirmationFormControl.valid) {
      if (passwordFormControl.value !== passwordConfirmationFormControl.value) {
        return { passwordConfirmation: true };
      }
    }
    return null;
  }
};
