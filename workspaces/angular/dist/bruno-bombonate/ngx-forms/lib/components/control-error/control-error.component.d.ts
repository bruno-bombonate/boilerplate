import { ControlErrors } from '../../interfaces/control-errors.interface';
import * as i0 from "@angular/core";
export declare class ControlErrorComponent {
    private readonly formsService;
    readonly controlErrors: import("@angular/core").InputSignal<ControlErrors | null>;
    readonly controlErrorMessage: import("@angular/core").Signal<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlErrorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlErrorComponent, "control-error", never, { "controlErrors": { "alias": "controlErrors"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
