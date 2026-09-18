import * as i0 from '@angular/core';
import { InjectionToken, inject, Service, input, computed, Component } from '@angular/core';
import { isFieldTree, provideSignalFormsConfig } from '@angular/forms/signals';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, EMPTY } from 'rxjs';

const CONTROL_ERRORS_INJECTION_TOKEN = new InjectionToken('controlErrors', { providedIn: 'root', factory: () => undefined });

const CONTROL_ERROR_VISIBLE_INJECTION_TOKEN = new InjectionToken('controlErrorVisible', { providedIn: 'root', factory: () => undefined });

const FIELD_ERRORS_INJECTION_TOKEN = new InjectionToken('fieldErrors', { providedIn: 'root', factory: () => undefined });

const FIELD_ERROR_VISIBLE_INJECTION_TOKEN = new InjectionToken('fieldErrorVisible', { providedIn: 'root', factory: () => undefined });

const CONTROL_ERRORS = {
    required: () => 'Please fill this field.',
    requiredTrue: () => 'Please fill this field.',
    email: () => 'Please fill the email in the format: yourname@example.com.',
    pattern: () => 'Please fill this field in the correct format.',
    min: (error) => `Please enter a value of at least ${error.min}.`,
    max: (error) => `Please enter a maximum value of ${error.max}.`,
    minlength: (error) => `Please enter at least ${error.requiredLength} characters.`,
    maxlength: (error) => `Please enter a maximum of ${error.requiredLength} characters.`
};

const CONTROL_ERROR_VISIBLE = (control) => {
    const controlErrorsIsNotNull = control.errors !== null;
    const controlTouchedIsTrue = control.touched === true;
    const controlDirtyIsTrue = control.dirty === true;
    return controlErrorsIsNotNull && (controlTouchedIsTrue || controlDirtyIsTrue);
};

const FIELD_ERRORS = {
    required: (error) => error.message ?? 'Please fill this field.',
    email: (error) => error.message ?? 'Please fill the email in the format: yourname@example.com.',
    pattern: (error) => error.message ?? 'Please fill this field in the correct format.',
    min: (error) => error.message ?? `Please enter a value of at least ${error.min}.`,
    max: (error) => error.message ?? `Please enter a maximum value of ${error.max}.`,
    minLength: (error) => error.message ?? `Please enter at least ${error.minLength} characters.`,
    maxLength: (error) => error.message ?? `Please enter a maximum of ${error.maxLength} characters.`
};

const FIELD_ERROR_VISIBLE = (field) => {
    const fieldErrorsIsNotEmpty = field.errors().length > 0;
    const fieldTouchedIsTrue = field.touched() === true;
    const fieldDirtyIsTrue = field.dirty() === true;
    return fieldErrorsIsNotEmpty && (fieldTouchedIsTrue || fieldDirtyIsTrue);
};

class FormsService {
    controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });
    controlErrorVisibleInjectionToken = inject(CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });
    fieldErrorsInjectionToken = inject(FIELD_ERRORS_INJECTION_TOKEN, { optional: true });
    fieldErrorVisibleInjectionToken = inject(FIELD_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });
    controlErrors = {
        ...CONTROL_ERRORS,
        ...(this.controlErrorsInjectionToken ?? {})
    };
    controlErrorVisible = this.controlErrorVisibleInjectionToken ?? CONTROL_ERROR_VISIBLE;
    fieldErrors = {
        ...FIELD_ERRORS,
        ...(this.fieldErrorsInjectionToken ?? {})
    };
    fieldErrorVisible = this.fieldErrorVisibleInjectionToken ?? FIELD_ERROR_VISIBLE;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: FormsService, deps: [], target: i0.ɵɵFactoryTarget.Service });
    static ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.1.7", ngImport: i0, type: FormsService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: FormsService, decorators: [{
            type: Service
        }] });

class ControlErrorComponent {
    formsService = inject(FormsService);
    control = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []));
    // Reactive Forms only: control.touched/dirty/errors are mutated imperatively (e.g.
    // markAllAsTouched()) without changing the control reference, so nothing here would ever
    // recompute without listening to control.events. Signal Forms fields don't need this trick -
    // their touched/dirty/errors are already real signals, read directly in the computeds below.
    controlEvents = toSignal(toObservable(this.control).pipe(switchMap((control) => isFieldTree(control) ? EMPTY : control.events)));
    controlErrorVisible = computed(() => {
        const control = this.control();
        if (isFieldTree(control)) {
            return this.formsService.fieldErrorVisible(control());
        }
        this.controlEvents();
        return this.formsService.controlErrorVisible(control);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "controlErrorVisible" }] : /* istanbul ignore next */ []));
    controlErrorMessage = computed(() => {
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
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "controlErrorMessage" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ControlErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: ControlErrorComponent, isStandalone: true, selector: "control-error", inputs: { control: { classPropertyName: "control", publicName: "control", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@if (controlErrorVisible() === true) {\r\n  {{ controlErrorMessage() }}\r\n}\r\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ControlErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-error', imports: [], template: "@if (controlErrorVisible() === true) {\r\n  {{ controlErrorMessage() }}\r\n}\r\n" }]
        }], propDecorators: { control: [{ type: i0.Input, args: [{ isSignal: true, alias: "control", required: true }] }] } });

class ControlTipComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ControlTipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: ControlTipComponent, isStandalone: true, selector: "control-tip", ngImport: i0, template: "<ng-content>\n</ng-content>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ControlTipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-tip', imports: [], template: "<ng-content>\n</ng-content>\n" }]
        }] });

const provideNgxForms = (config = {}) => {
    // Signal Forms, unlike Reactive Forms, doesn't apply ng-valid/ng-invalid/ng-touched/etc.
    // classes by default - registered unconditionally so consumers of SignalFormComponentClass
    // (@bruno-bombonate/ngx-classes) get the same CSS hooks Reactive Forms provides out of the box.
    const providers = [
        ...provideSignalFormsConfig({
            classes: {
                'ng-valid': (formField) => formField.state().valid(),
                'ng-invalid': (formField) => formField.state().invalid(),
                'ng-touched': (formField) => formField.state().touched(),
                'ng-untouched': (formField) => formField.state().touched() === false,
                'ng-dirty': (formField) => formField.state().dirty(),
                'ng-pristine': (formField) => formField.state().dirty() === false
            }
        })
    ];
    if (config.controlErrors !== undefined) {
        providers.push({ provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config.controlErrors });
    }
    if (config.controlErrorVisible !== undefined) {
        providers.push({ provide: CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.controlErrorVisible });
    }
    if (config.fieldErrors !== undefined) {
        providers.push({ provide: FIELD_ERRORS_INJECTION_TOKEN, useValue: config.fieldErrors });
    }
    if (config.fieldErrorVisible !== undefined) {
        providers.push({ provide: FIELD_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.fieldErrorVisible });
    }
    return providers;
};

/*
 * Public API Surface of ngx-forms
 */
// components

/**
 * Generated bundle index. Do not edit.
 */

export { CONTROL_ERRORS, CONTROL_ERRORS_INJECTION_TOKEN, CONTROL_ERROR_VISIBLE, CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, ControlErrorComponent, ControlTipComponent, FIELD_ERRORS, FIELD_ERRORS_INJECTION_TOKEN, FIELD_ERROR_VISIBLE, FIELD_ERROR_VISIBLE_INJECTION_TOKEN, FormsService, provideNgxForms };
//# sourceMappingURL=bruno-bombonate-ngx-forms.mjs.map
