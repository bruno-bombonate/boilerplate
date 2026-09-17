import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { FormsService } from '../../services/forms/forms-service';

@Component({
  selector: 'control-error',
  imports: [],
  templateUrl: './control-error-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

  private readonly formsService = inject(FormsService);

  public readonly control = input.required<AbstractControl>();

  // control.touched/dirty/errors are mutated imperatively by Reactive Forms (e.g. markAllAsTouched())
  // without changing the control reference, so nothing here would ever recompute without this:
  // control.events emits on every touched/pristine/status/value change, driving the computeds below.
  private readonly controlEvents = toSignal(
    toObservable(this.control).pipe(switchMap((control) => control.events)),
  );

  public readonly controlErrorVisible = computed<boolean>(() => {
    this.controlEvents();
    return this.formsService.controlErrorVisible(this.control());
  });

  public readonly controlErrorMessage = computed<undefined | string>(() => {

    this.controlEvents();

    const controlErrors = this.control().errors;

    if (controlErrors !== null) {
      for (const key in controlErrors) {
        const controlError = this.formsService.controlErrors[key];
        if (controlError === undefined) {
          throw Error(`${key} error is not defined at controlErrors object. If you are using a custom validator use provideNgxForms({ controlErrors }) at app.config.ts.`);
        }
        return controlError(controlErrors[key]);
      }
    }
    return undefined;

  });

}
