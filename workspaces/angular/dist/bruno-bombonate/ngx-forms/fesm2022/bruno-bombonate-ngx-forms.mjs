import * as i0 from '@angular/core';
import { InjectionToken, inject, Injectable, input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

const CONTROL_ERRORS_INJECTION_TOKEN = new InjectionToken('controlErrors', { providedIn: 'root', factory: () => undefined });

const CONTROL_ERROR_VISIBLE_INJECTION_TOKEN = new InjectionToken('controlErrorVisible', { providedIn: 'root', factory: () => undefined });

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

class FormsService {
    controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });
    controlErrorVisibleInjectionToken = inject(CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, { optional: true });
    controlErrors = {
        ...CONTROL_ERRORS,
        ...(this.controlErrorsInjectionToken ?? {})
    };
    controlErrorVisible = this.controlErrorVisibleInjectionToken ?? CONTROL_ERROR_VISIBLE;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: FormsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: FormsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: FormsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class ControlErrorComponent {
    formsService = inject(FormsService);
    control = input.required(...(ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []));
    // control.touched/dirty/errors are mutated imperatively by Reactive Forms (e.g. markAllAsTouched())
    // without changing the control reference, so nothing here would ever recompute without this:
    // control.events emits on every touched/pristine/status/value change, driving the computeds below.
    controlEvents = toSignal(toObservable(this.control).pipe(switchMap((control) => control.events)));
    controlErrorVisible = computed(() => {
        this.controlEvents();
        return this.formsService.controlErrorVisible(this.control());
    }, ...(ngDevMode ? [{ debugName: "controlErrorVisible" }] : /* istanbul ignore next */ []));
    controlErrorMessage = computed(() => {
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
    }, ...(ngDevMode ? [{ debugName: "controlErrorMessage" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: ControlErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.23", type: ControlErrorComponent, isStandalone: true, selector: "control-error", inputs: { control: { classPropertyName: "control", publicName: "control", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@if (controlErrorVisible() === true) {\n  {{ controlErrorMessage() }}\n}\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: ControlErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-error', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (controlErrorVisible() === true) {\n  {{ controlErrorMessage() }}\n}\n" }]
        }], propDecorators: { control: [{ type: i0.Input, args: [{ isSignal: true, alias: "control", required: true }] }] } });

class ControlTipComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: ControlTipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.23", type: ControlTipComponent, isStandalone: true, selector: "control-tip", ngImport: i0, template: "<ng-content>\n</ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: ControlTipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-tip', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content>\n</ng-content>\n" }]
        }] });

const provideNgxForms = (config) => {
    const providers = [];
    if (config.controlErrors !== undefined) {
        providers.push({ provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config.controlErrors });
    }
    if (config.controlErrorVisible !== undefined) {
        providers.push({ provide: CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, useValue: config.controlErrorVisible });
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

export { CONTROL_ERRORS, CONTROL_ERRORS_INJECTION_TOKEN, CONTROL_ERROR_VISIBLE, CONTROL_ERROR_VISIBLE_INJECTION_TOKEN, ControlErrorComponent, ControlTipComponent, FormsService, provideNgxForms };
//# sourceMappingURL=bruno-bombonate-ngx-forms.mjs.map
