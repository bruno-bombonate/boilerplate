import * as i0 from '@angular/core';
import { inject, DestroyRef, Directive, signal, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';

class DestroyRefClass {
    destroyRef = inject(DestroyRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: DestroyRefClass, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.5", type: DestroyRefClass, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: DestroyRefClass, decorators: [{
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
    listSearchParams = signal({});
    list = signal([]);
    listLength = signal(0);
    listLoading = signal(false);
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
        const listSearchParams = this.listSearchParams();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ListContainerClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.5", type: ListContainerClass, isStandalone: true, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ListContainerClass, decorators: [{
            type: Directive
        }] });

class ListComponentClass extends DestroyRefClass {
    list = input([]);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ListComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.0.5", type: ListComponentClass, isStandalone: true, inputs: { list: { classPropertyName: "list", publicName: "list", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ListComponentClass, decorators: [{
            type: Directive
        }] });

class ViewComponentClass extends DestroyRefClass {
    item = input.required();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ViewComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.0.5", type: ViewComponentClass, isStandalone: true, inputs: { item: { classPropertyName: "item", publicName: "item", isSignal: true, isRequired: true, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: ViewComponentClass, decorators: [{
            type: Directive
        }] });

class FormComponentClass extends DestroyRefClass {
    form = input(new FormGroup({}));
    formData = input(undefined);
    formLoading = input(false);
    formReset = input(new Subject());
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
            .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged(), debounceTime(500))
            .subscribe(() => {
            const valueMapped = this.mapOutputValue(form.value);
            this.formChange.emit(valueMapped);
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
    controlErrorMessageIsVisible(control) {
        const controlErrorsIsNotNull = control.errors !== null;
        const controlTouchedIsTrue = control.touched === true;
        const controlDirtyIsTrue = control.dirty === true;
        return controlErrorsIsNotNull && (controlTouchedIsTrue || controlDirtyIsTrue);
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
            const invalidControlList = document.querySelectorAll('input.ng-invalid');
            const invalidControlListFirst = invalidControlList[0];
            if (invalidControlListFirst !== undefined) {
                invalidControlListFirst.scrollIntoView({ block: 'center' });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: FormComponentClass, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.0.5", type: FormComponentClass, isStandalone: true, inputs: { form: { classPropertyName: "form", publicName: "form", isSignal: true, isRequired: false, transformFunction: null }, formData: { classPropertyName: "formData", publicName: "formData", isSignal: true, isRequired: false, transformFunction: null }, formLoading: { classPropertyName: "formLoading", publicName: "formLoading", isSignal: true, isRequired: false, transformFunction: null }, formReset: { classPropertyName: "formReset", publicName: "formReset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { formBack: "formBack", formChange: "formChange", formSubmit: "formSubmit" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: FormComponentClass, decorators: [{
            type: Directive
        }] });

/*
 * Public API Surface of ngx-classes
 */
// classes

/**
 * Generated bundle index. Do not edit.
 */

export { DestroyRefClass, FormComponentClass, ListComponentClass, ListContainerClass, SearchParamType, SearchParamValueType, ViewComponentClass, transform, transformBoolean, transformNumber, transformString };
//# sourceMappingURL=bruno-bombonate-ngx-classes.mjs.map
