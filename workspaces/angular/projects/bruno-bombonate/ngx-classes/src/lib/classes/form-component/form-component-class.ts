import { Directive, ElementRef, OnChanges, OnInit, inject, input, output, SimpleChanges } from '@angular/core';
import { DestroyRefClass } from '../destroy-ref/destroy-ref-class';
import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export class FormComponentClass extends DestroyRefClass implements OnChanges, OnInit {

  protected readonly elementRef = inject(ElementRef);

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

  protected addFormValueChangesListener(): void {

    const form = this.form();

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

  }

  protected addFormResetListener(): void {

    const form = this.form();
    const formReset = this.formReset();

    formReset
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => form.reset());

  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {

    const form = this.form();

    if (simpleChanges['formData']?.currentValue) {
      const valueMapped = this.mapInputValue(simpleChanges['formData'].currentValue);
      form.patchValue(valueMapped, { emitEvent: false });
    }

  }

  public ngOnInit(): void {
    this.addFormValueChangesListener();
    this.addFormResetListener();
  }

  public handleNgSubmit(): void {

    const form = this.form();
    const formLoading = this.formLoading();

    form.markAllAsTouched();

    if (form.valid === true && formLoading === false) {
      const valueMapped = this.mapOutputValue(form.value);
      this.formSubmit.emit(valueMapped);
    } else {
      const firstInvalidControl = this.elementRef.nativeElement.querySelector('.ng-invalid:not(form)');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ block: 'center' });
      }
    }

  }

}
