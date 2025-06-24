import { Directive, OnChanges, OnInit, input, output, SimpleChanges } from '@angular/core';
import { DestroyRefClass } from './destroy-ref.class';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export class FormComponentClass extends DestroyRefClass implements OnChanges, OnInit {

  public readonly form = input<any>(new FormGroup({ }));
  public readonly formData = input<undefined | any>(undefined);
  public readonly formLoading = input<boolean>(false);
  public readonly formReset = input<Subject<void>>(new Subject());

  public readonly formBack = output<void>();
  public readonly formChange = output<any>();
  public readonly formSubmit = output<any>();

  protected mapInputValue(value: any): any {
    return value;
  }

  protected mapOutputValue(value: any): any {
    return value;
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {

    const form = this.form();

    if (simpleChanges['formData']?.currentValue) {
      const valueMapped = this.mapInputValue(simpleChanges['formData'].currentValue);
      form.patchValue(valueMapped, { emitEvent: false });
    }

  }

  public ngOnInit(): void {

    const form = this.form();
    const formReset = this.formReset();

    form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(() => {
        const valueMapped = this.mapOutputValue(form.value);
        this.formChange.emit(valueMapped);
      });

    formReset
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => form.reset());

  }
  
  public controlErrorMessageIsVisible(control: AbstractControl): boolean {
    const controlErrorsIsNotNull = control.errors !== null;
    const controlTouchedIsTrue = control.touched === true;
    const controlDirtyIsTrue = control.dirty === true;
    return controlErrorsIsNotNull && (controlTouchedIsTrue || controlDirtyIsTrue);
  }

  public handleNgSubmit(): void {

    const form = this.form();
    const formLoading = this.formLoading();

    form.markAllAsTouched();

    if (form.valid === true && formLoading === false) {
      const valueMapped = this.mapOutputValue(form.value);
      this.formSubmit.emit(valueMapped);
    } else {
      const invalidControlList = document.querySelectorAll('input.ng-invalid');
      const invalidControlListFirst = invalidControlList[0];
      if (invalidControlListFirst !== undefined) {
        invalidControlListFirst.scrollIntoView({ block: 'center' });
      }
    }

  }

}
