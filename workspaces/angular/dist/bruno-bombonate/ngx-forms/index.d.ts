import * as i0 from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';

interface ControlErrors {
    [key: string]: (error: undefined | any) => string;
}

declare class ControlErrorComponent {
    private readonly formsService;
    readonly controlErrors: i0.InputSignal<ControlErrors | null>;
    readonly controlErrorMessage: i0.Signal<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlErrorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlErrorComponent, "control-error", never, { "controlErrors": { "alias": "controlErrors"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class ControlTipComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlTipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlTipComponent, "control-tip", never, {}, {}, never, ["*"], true, never>;
}

declare class FormsService {
    private readonly controlErrorsInjectionToken;
    readonly controlErrors: ControlErrors;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormsService>;
}

declare const CONTROL_ERRORS: ControlErrors;

declare const CONTROL_ERRORS_INJECTION_TOKEN: InjectionToken<ControlErrors | undefined>;

declare const provideNgxForms: (config: ControlErrors) => Provider[];

export { CONTROL_ERRORS, CONTROL_ERRORS_INJECTION_TOKEN, ControlErrorComponent, ControlTipComponent, FormsService, provideNgxForms };
export type { ControlErrors };
