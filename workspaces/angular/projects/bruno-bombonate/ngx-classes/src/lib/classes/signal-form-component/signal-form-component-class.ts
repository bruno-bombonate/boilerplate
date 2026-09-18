import { Directive, ElementRef, Injector, OnInit, WritableSignal, inject, input, output } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FieldTree } from '@angular/forms/signals';
import { DestroyRefClass } from '../destroy-ref/destroy-ref-class';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';

/**
 * Signal Forms counterpart of `FormComponentClass`. Kept as a separate class instead of unifying
 * the two: a Reactive `FormGroup` is passed in as a ready-made `input()`, while a Signal Forms
 * formModel/form pair is built by each concrete component via `signal()` + `form()`, so
 * `formModel`/`form` are declared here as abstract properties for subclasses to define, not as
 * inputs.
 *
 * Requires `provideNgxForms()` (from `@bruno-bombonate/ngx-forms`) in `app.config.ts` so invalid
 * fields carry the `ng-invalid` class the submit-scroll behavior below relies on — Signal Forms,
 * unlike Reactive Forms, does not add that class by default.
 */
@Directive()
export abstract class SignalFormComponentClass<TModel> extends DestroyRefClass implements OnInit {

  protected readonly elementRef = inject(ElementRef);
  private readonly injector = inject(Injector);

  protected abstract readonly formModel: WritableSignal<TModel>;
  protected abstract readonly form: FieldTree<TModel>;

  public readonly formData = input<undefined | any>(undefined);
  public readonly formLoading = input<boolean>(false);
  public readonly formReset = input<Subject<void>>(new Subject());

  public readonly formBack = output<void>();
  public readonly formChange = output<TModel>();
  public readonly formSubmit = output<TModel>();

  private initialFormModelValue?: TModel;

  protected mapInputValue(value: any): Partial<TModel> {
    return value;
  }

  protected mapOutputValue(value: TModel): any {
    return value;
  }

  protected addFormValueChangesListener(): void {

    toObservable(this.formModel, { injector: this.injector })
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        if (this.form().dirty() === true && this.destroyRef.destroyed === false) {
          const valueMapped = this.mapOutputValue(value);
          this.formChange.emit(valueMapped);
        }
      });

  }

  protected addFormResetListener(): void {

    this.formReset()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.initialFormModelValue !== undefined) {
          this.formModel.set(this.initialFormModelValue);
        }
        this.form().reset();
      });

  }

  protected addFormDataListener(): void {

    toObservable(this.formData, { injector: this.injector })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formData) => {
        if (formData !== undefined) {
          const valueMapped = this.mapInputValue(formData);
          this.formModel.update((value) => ({ ...value, ...valueMapped }));
        }
      });

  }

  public ngOnInit(): void {
    this.initialFormModelValue = this.formModel();
    this.addFormDataListener();
    this.addFormValueChangesListener();
    this.addFormResetListener();
  }

  public handleSubmit(): void {

    const formState = this.form();
    const formLoading = this.formLoading();

    formState.markAsTouched();

    if (formState.valid() === true && formLoading === false) {
      const valueMapped = this.mapOutputValue(this.formModel());
      this.formSubmit.emit(valueMapped);
    } else {
      const firstInvalidControl = this.elementRef.nativeElement.querySelector('.ng-invalid:not(form)');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ block: 'center' });
      }
    }

  }

}
