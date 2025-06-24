import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, InjectionToken, inject, Injectable, input, computed } from '@angular/core';

class ControlTipComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ControlTipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.11", type: ControlTipComponent, isStandalone: true, selector: "control-tip", ngImport: i0, template: "<ng-content>\r\n</ng-content>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ControlTipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-tip', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content>\r\n</ng-content>\r\n" }]
        }] });

const CONTROL_ERRORS_INJECTION_TOKEN = new InjectionToken('controlErrors', { providedIn: 'root', factory: () => undefined });

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

class FormsService {
    controlErrorsInjectionToken = inject(CONTROL_ERRORS_INJECTION_TOKEN, { optional: true });
    controlErrors = {
        ...CONTROL_ERRORS,
        ...(this.controlErrorsInjectionToken ?? {})
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: FormsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: FormsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: FormsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class ControlErrorComponent {
    formsService = inject(FormsService);
    controlErrors = input(null);
    controlErrorMessage = computed(() => {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ControlErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.11", type: ControlErrorComponent, isStandalone: true, selector: "control-error", inputs: { controlErrors: { classPropertyName: "controlErrors", publicName: "controlErrors", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "{{ controlErrorMessage() }}\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ControlErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'control-error', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "{{ controlErrorMessage() }}\r\n" }]
        }] });

const provideNgxForms = (config) => {
    return [
        { provide: CONTROL_ERRORS_INJECTION_TOKEN, useValue: config }
    ];
};

/*
 * Public API Surface of ngx-forms
 */
// components

/**
 * Generated bundle index. Do not edit.
 */

export { CONTROL_ERRORS, CONTROL_ERRORS_INJECTION_TOKEN, ControlErrorComponent, ControlTipComponent, FormsService, provideNgxForms };
//# sourceMappingURL=bruno-bombonate-ngx-forms.mjs.map
