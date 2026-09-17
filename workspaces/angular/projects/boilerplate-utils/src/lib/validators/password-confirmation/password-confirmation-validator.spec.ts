import { FormControl, FormGroup } from '@angular/forms';
import { passwordConfirmation } from './password-confirmation-validator';

describe('passwordConfirmationValidator', () => {

  it('should return null when both passwords match', () => {
    const form = new FormGroup({
      password: new FormControl('123456'),
      passwordConfirmation: new FormControl('123456')
    }, { validators: passwordConfirmation('password', 'passwordConfirmation') });
    expect(form.errors).toBeNull();
  });

  it('should return a passwordConfirmation error when passwords do not match', () => {
    const form = new FormGroup({
      password: new FormControl('123456'),
      passwordConfirmation: new FormControl('654321')
    }, { validators: passwordConfirmation('password', 'passwordConfirmation') });
    expect(form.errors).toEqual({ passwordConfirmation: true });
  });

});
