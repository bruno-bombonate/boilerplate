import { Component, inject, input, computed } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldTree, isFieldTree } from '@angular/forms/signals';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';
import { FormsService } from '../../services/forms/forms-service';

@Component({
  selector: 'control-error',
  imports: [],
  templateUrl: './control-error-component.html'
})
export class ControlErrorComponent {

  private readonly formsService = inject(FormsService);

  public readonly control = input.required<AbstractControl | FieldTree<unknown>>();

  // Reactive Forms only: control.touched/dirty/errors are mutated imperatively (e.g.
  // markAllAsTouched()) without changing the control reference, so nothing here would ever
  // recompute without listening to control.events. Signal Forms fields don't need this trick -
  // their touched/dirty/errors are already real signals, read directly in the computeds below.
  private readonly controlEvents = toSignal(
    toObservable(this.control).pipe(
      switchMap((control) => isFieldTree(control) ? EMPTY : control.events)
    )
  );

  public readonly controlErrorVisible = computed<boolean>(() => {

    const control = this.control();

    if (isFieldTree(control)) {
      return this.formsService.fieldErrorVisible(control());
    }

    this.controlEvents();
    return this.formsService.controlErrorVisible(control);

  });

  public readonly controlErrorMessage = computed<undefined | string>(() => {

    const control = this.control();

    if (isFieldTree(control)) {

      const fieldErrors = control().errors();

      if (fieldErrors.length > 0) {
        const fieldError = fieldErrors[0];
        const fieldErrorFn = this.formsService.fieldErrors[fieldError.kind];
        if (fieldErrorFn === undefined) {
          throw Error(`${fieldError.kind} error is not defined at fieldErrors object. If you are using a custom validator use provideNgxForms({ fieldErrors }) at app.config.ts.`);
        }
        return fieldErrorFn(fieldError);
      }

      return undefined;

    }

    this.controlEvents();

    const controlErrors = control.errors;

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
