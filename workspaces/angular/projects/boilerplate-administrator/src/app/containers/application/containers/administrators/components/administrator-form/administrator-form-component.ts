import { Component, ChangeDetectionStrategy, OnChanges, input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { DatePipe } from '@angular/common';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';
import { passwordConfirmation } from '../../../../../../../../../../utils/validators/password-confirmation/password-confirmation-validator';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-administrator-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent,
    // pipes
    DatePipe
  ],
  templateUrl: './administrator-form-component.html',
  styleUrl: './administrator-form-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorFormComponent extends FormComponentClass implements OnChanges {
  
  public override readonly form = input(
    new FormGroup({
      name: new FormControl<null | string>(null, [Validators.required]),
      email: new FormControl<null | string>(null, [Validators.required, Validators.email]),
      password: new FormGroup({
        password: new FormControl<null | string>(null, [Validators.required]),
        passwordConfirmation: new FormControl<null | boolean>(null, [Validators.required]),
      }, { validators: passwordConfirmation('password', 'passwordConfirmation') }),
      status: new FormControl<null | boolean>(null, [Validators.required])
    })
  );

  public get passwordFormGroup() {
    return this.form().controls['password'];
  }

  protected override mapOutputValue(value: any): any {
    const valueClone = cloneDeep(value);
    if (valueClone.password !== undefined) {
      valueClone.password = valueClone.password.password;
    }
    return valueClone;
  }

  public override ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges && simpleChanges['formData'] && simpleChanges['formData'].firstChange) {
      this.passwordFormGroup.disable();
      const valueMapped = this.mapInputValue(simpleChanges['formData'].currentValue);
      this.form().patchValue(valueMapped);
    }
  }

}
