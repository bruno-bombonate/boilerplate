import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { ControlErrors } from '../../interfaces/control-errors.interface';

@Component({
  selector: 'control-error',
  imports: [],
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

  private readonly formsService = inject(FormsService);

  public readonly controlErrors = input<null | ControlErrors>(null);

  public readonly controlErrorMessage = computed<undefined | string>(() => {

    const controlErrors = this.controlErrors();

    if (controlErrors !== null) {
      for (const key in controlErrors) {
        const controlError = this.formsService.controlErrors[key];
        if (controlError === undefined) {
          throw Error(`${key} error is not defined at controlErrors object. If you are using a custom validator use FormsModule.forRoot(controlErrorsCustom).`);
        }
        return controlError(controlErrors[key]);
      }
    }
    return undefined;

  });

}
