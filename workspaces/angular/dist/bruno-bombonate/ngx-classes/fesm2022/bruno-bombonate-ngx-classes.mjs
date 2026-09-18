import * as i0 from '@angular/core';
import { inject, DestroyRef, Directive, signal, input, ElementRef, output, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';

class DestroyRefClass {
    destroyRef = inject(DestroyRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: DestroyRefClass, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.1.7", type: DestroyRefClass, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: DestroyRefClass, decorators: [{
            type: Directive
        }] });

var SearchParamType;
(function (SearchParamType) {
    SearchParamType["Param"] = "paramMap";
    SearchParamType["QueryParam"] = "queryParamMap";
})(SearchParamType || (SearchParamType = {}));
var SearchParamValueType;
(function (SearchParamValueType) {
    SearchParamValueType["Number"] = "number";
    SearchParamValueType["String"] = "string";
    SearchParamValueType["Boolean"] = "boolean";
})(SearchParamValueType || (SearchParamValueType = {}));

const transformNumber = (value) => {
    const valueTypeOfIsNumber = typeof value === 'number';
    const valueTypeOfIsString = typeof value === 'string';
    const valueIsNotEmpty = value !== '';
    if (valueTypeOfIsNumber) {
        return value;
    }
    else if (valueTypeOfIsString && valueIsNotEmpty) {
        const valueInNumber = +value;
        const valueIsNumber = isNaN(valueInNumber) === false;
        if (valueIsNumber) {
            return valueInNumber;
        }
    }
    return null;
};

const transformString = (value) => {
    const valueTypeOfIsNumber = typeof value === 'number';
    const valueTypeOfIsBoolean = typeof value === 'boolean';
    const valueIsNotEmpty = value !== '';
    if (valueTypeOfIsNumber) {
        return value.toString();
    }
    else if (valueTypeOfIsBoolean) {
        return value.toString();
    }
    else if (valueIsNotEmpty) {
        return value;
    }
    return null;
};

const transformBoolean = (value) => {
    const valueTypeOfIsBoolean = typeof value === 'boolean';
    const valueTypeOfIsString = typeof value === 'string';
    if (valueTypeOfIsBoolean) {
        return value;
    }
    else if (valueTypeOfIsString) {
        if (value === 'true') {
            return true;
        }
        else if (value === 'false') {
            return false;
        }
    }
    return null;
};

const transform = (searchParam, searchParamValue) => {
    if (searchParam.valueType === SearchParamValueType.Number) {
        return transformNumber(searchParamValue);
    }
    else if (searchParam.valueType === SearchParamValueType.String) {
        return transformString(searchParamValue);
    }
    else if (searchParam.valueType === SearchParamValueType.Boolean) {
        return transformBoolean(searchParamValue);
    }
    return null;
};

class ListContainerClass extends DestroyRefClass {
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    listSearchParamsList = [];
    listSearchParams = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "listSearchParams" }] : /* istanbul ignore next */ []));
    list = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "list" }] : /* istanbul ignore next */ []));
    listLength = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "listLength" }] : /* istanbul ignore next */ []));
    listLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "listLoading" }] : /* istanbul ignore next */ []));
    setListSearchParams() {
        const listSearchParamsList = [...this.listSearchParamsList];
        const listSearchParams = {};
        listSearchParamsList.forEach((searchParam) => {
            const searchParamValue = this.activatedRoute.snapshot[searchParam.type].get(searchParam.name);
            if (searchParamValue === null) {
                if (searchParam.valueDefault !== undefined) {
                    listSearchParams[searchParam.name] = searchParam.valueDefault;
                }
            }
            else {
                listSearchParams[searchParam.name] = transform(searchParam, searchParamValue);
            }
        });
        this.listSearchParams.set(listSearchParams);
    }
    getList() { }
    addActivatedRouteQueryParamsListener() {
        this.activatedRoute.queryParams
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.getList();
        });
    }
    ngOnInit() {
        this.setListSearchParams();
        this.addActivatedRouteQueryParamsListener();
    }
    handleListSearchFormChange(value) {
        const listSearchParams = { ...this.listSearchParams() };
        listSearchParams.page = 1;
        this.listSearchParamsList.forEach((searchParam) => {
            const searchParamValue = value[searchParam.name];
            if (searchParamValue !== undefined) {
                const searchParamValueTransformed = transform(searchParam, searchParamValue);
                if (searchParamValueTransformed === null) {
                    delete listSearchParams[searchParam.name];
                }
                else {
                    listSearchParams[searchParam.name] = searchParamValueTransformed;
                }
            }
        });
        const listSearchParamsExcludingTypeParam = { ...listSearchParams };
        this.listSearchParamsList.forEach((searchParams) => {
            if (searchParams.type === SearchParamType.Param) {
                delete listSearchParamsExcludingTypeParam[searchParams.name];
            }
        });
        this.listSearchParams.set(listSearchParams);
        this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: listSearchParamsExcludingTypeParam });
    }
    handleListPageChange(pageEvent) {
        const listSearchParams = { ...this.listSearchParams() };
        listSearchParams.page = pageEvent.pageIndex + 1;
        const listSearchParamsExcludingTypeParam = { ...listSearchParams };
        this.listSearchParamsList.forEach((searchParams) => {
            if (searchParams.type === SearchParamType.Param) {
                delete listSearchParamsExcludingTypeParam[searchParams.name];
            }
        });
        this.listSearchParams.set(listSearchParams);
        this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: listSearchParamsExcludingTypeParam });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ListContainerClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.1.7", type: ListContainerClass, isStandalone: true, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ListContainerClass, decorators: [{
            type: Directive
        }] });

class ListComponentClass extends DestroyRefClass {
    list = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "list" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ListComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "22.1.7", type: ListComponentClass, isStandalone: true, inputs: { list: { classPropertyName: "list", publicName: "list", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ListComponentClass, decorators: [{
            type: Directive
        }], propDecorators: { list: [{ type: i0.Input, args: [{ isSignal: true, alias: "list", required: false }] }] } });

class ViewComponentClass extends DestroyRefClass {
    item = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "item" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ViewComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "22.1.7", type: ViewComponentClass, isStandalone: true, inputs: { item: { classPropertyName: "item", publicName: "item", isSignal: true, isRequired: true, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ViewComponentClass, decorators: [{
            type: Directive
        }], propDecorators: { item: [{ type: i0.Input, args: [{ isSignal: true, alias: "item", required: true }] }] } });

class FormComponentClass extends DestroyRefClass {
    elementRef = inject(ElementRef);
    form = input(new FormGroup({}), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "form" }] : /* istanbul ignore next */ []));
    formData = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formData" }] : /* istanbul ignore next */ []));
    formLoading = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formLoading" }] : /* istanbul ignore next */ []));
    formReset = input(new Subject(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formReset" }] : /* istanbul ignore next */ []));
    formBack = output();
    formChange = output();
    formSubmit = output();
    mapInputValue(value) {
        return value;
    }
    mapOutputValue(value) {
        return value;
    }
    addFormValueChangesListener() {
        const form = this.form();
        form.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(500), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            if (this.destroyRef.destroyed === false) {
                const valueMapped = this.mapOutputValue(form.value);
                this.formChange.emit(valueMapped);
            }
        });
    }
    addFormResetListener() {
        const form = this.form();
        const formReset = this.formReset();
        formReset
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => form.reset());
    }
    ngOnChanges(simpleChanges) {
        const form = this.form();
        if (simpleChanges['formData']?.currentValue) {
            const valueMapped = this.mapInputValue(simpleChanges['formData'].currentValue);
            form.patchValue(valueMapped, { emitEvent: false });
        }
    }
    ngOnInit() {
        this.addFormValueChangesListener();
        this.addFormResetListener();
    }
    handleNgSubmit() {
        const form = this.form();
        const formLoading = this.formLoading();
        form.markAllAsTouched();
        if (form.valid === true && formLoading === false) {
            const valueMapped = this.mapOutputValue(form.value);
            this.formSubmit.emit(valueMapped);
        }
        else {
            const firstInvalidControl = this.elementRef.nativeElement.querySelector('.ng-invalid:not(form)');
            if (firstInvalidControl) {
                firstInvalidControl.scrollIntoView({ block: 'center' });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: FormComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "22.1.7", type: FormComponentClass, isStandalone: true, inputs: { form: { classPropertyName: "form", publicName: "form", isSignal: true, isRequired: false, transformFunction: null }, formData: { classPropertyName: "formData", publicName: "formData", isSignal: true, isRequired: false, transformFunction: null }, formLoading: { classPropertyName: "formLoading", publicName: "formLoading", isSignal: true, isRequired: false, transformFunction: null }, formReset: { classPropertyName: "formReset", publicName: "formReset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { formBack: "formBack", formChange: "formChange", formSubmit: "formSubmit" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: FormComponentClass, decorators: [{
            type: Directive
        }], propDecorators: { form: [{ type: i0.Input, args: [{ isSignal: true, alias: "form", required: false }] }], formData: [{ type: i0.Input, args: [{ isSignal: true, alias: "formData", required: false }] }], formLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "formLoading", required: false }] }], formReset: [{ type: i0.Input, args: [{ isSignal: true, alias: "formReset", required: false }] }], formBack: [{ type: i0.Output, args: ["formBack"] }], formChange: [{ type: i0.Output, args: ["formChange"] }], formSubmit: [{ type: i0.Output, args: ["formSubmit"] }] } });

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
class SignalFormComponentClass extends DestroyRefClass {
    elementRef = inject(ElementRef);
    injector = inject(Injector);
    formData = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formData" }] : /* istanbul ignore next */ []));
    formLoading = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formLoading" }] : /* istanbul ignore next */ []));
    formReset = input(new Subject(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formReset" }] : /* istanbul ignore next */ []));
    formBack = output();
    formChange = output();
    formSubmit = output();
    initialFormModelValue;
    mapInputValue(value) {
        return value;
    }
    mapOutputValue(value) {
        return value;
    }
    addFormValueChangesListener() {
        toObservable(this.formModel, { injector: this.injector })
            .pipe(distinctUntilChanged(), debounceTime(500), takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => {
            if (this.form().dirty() === true && this.destroyRef.destroyed === false) {
                const valueMapped = this.mapOutputValue(value);
                this.formChange.emit(valueMapped);
            }
        });
    }
    addFormResetListener() {
        this.formReset()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            if (this.initialFormModelValue !== undefined) {
                this.formModel.set(this.initialFormModelValue);
            }
            this.form().reset();
        });
    }
    addFormDataListener() {
        toObservable(this.formData, { injector: this.injector })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((formData) => {
            if (formData !== undefined) {
                const valueMapped = this.mapInputValue(formData);
                this.formModel.update((value) => ({ ...value, ...valueMapped }));
            }
        });
    }
    ngOnInit() {
        this.initialFormModelValue = this.formModel();
        this.addFormDataListener();
        this.addFormValueChangesListener();
        this.addFormResetListener();
    }
    handleSubmit() {
        const formState = this.form();
        const formLoading = this.formLoading();
        formState.markAsTouched();
        if (formState.valid() === true && formLoading === false) {
            const valueMapped = this.mapOutputValue(this.formModel());
            this.formSubmit.emit(valueMapped);
        }
        else {
            const firstInvalidControl = this.elementRef.nativeElement.querySelector('.ng-invalid:not(form)');
            if (firstInvalidControl) {
                firstInvalidControl.scrollIntoView({ block: 'center' });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: SignalFormComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "22.1.7", type: SignalFormComponentClass, isStandalone: true, inputs: { formData: { classPropertyName: "formData", publicName: "formData", isSignal: true, isRequired: false, transformFunction: null }, formLoading: { classPropertyName: "formLoading", publicName: "formLoading", isSignal: true, isRequired: false, transformFunction: null }, formReset: { classPropertyName: "formReset", publicName: "formReset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { formBack: "formBack", formChange: "formChange", formSubmit: "formSubmit" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: SignalFormComponentClass, decorators: [{
            type: Directive
        }], propDecorators: { formData: [{ type: i0.Input, args: [{ isSignal: true, alias: "formData", required: false }] }], formLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "formLoading", required: false }] }], formReset: [{ type: i0.Input, args: [{ isSignal: true, alias: "formReset", required: false }] }], formBack: [{ type: i0.Output, args: ["formBack"] }], formChange: [{ type: i0.Output, args: ["formChange"] }], formSubmit: [{ type: i0.Output, args: ["formSubmit"] }] } });

/*
 * Public API Surface of ngx-classes
 */
// classes

/**
 * Generated bundle index. Do not edit.
 */

export { DestroyRefClass, FormComponentClass, ListComponentClass, ListContainerClass, SearchParamType, SearchParamValueType, SignalFormComponentClass, ViewComponentClass, transform, transformBoolean, transformNumber, transformString };
//# sourceMappingURL=bruno-bombonate-ngx-classes.mjs.map
