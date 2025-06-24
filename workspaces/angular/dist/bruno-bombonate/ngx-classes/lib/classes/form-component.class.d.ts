import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DestroyRefClass } from './destroy-ref.class';
import { Subject } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class FormComponentClass extends DestroyRefClass implements OnChanges, OnInit {
    readonly form: import("@angular/core").InputSignal<any>;
    readonly formData: import("@angular/core").InputSignal<any>;
    readonly formLoading: import("@angular/core").InputSignal<boolean>;
    readonly formReset: import("@angular/core").InputSignal<Subject<void>>;
    readonly formBack: import("@angular/core").OutputEmitterRef<void>;
    readonly formChange: import("@angular/core").OutputEmitterRef<any>;
    readonly formSubmit: import("@angular/core").OutputEmitterRef<any>;
    protected mapInputValue(value: any): any;
    protected mapOutputValue(value: any): any;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngOnInit(): void;
    controlErrorMessageIsVisible(control: AbstractControl): boolean;
    handleNgSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormComponentClass, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FormComponentClass, never, never, { "form": { "alias": "form"; "required": false; "isSignal": true; }; "formData": { "alias": "formData"; "required": false; "isSignal": true; }; "formLoading": { "alias": "formLoading"; "required": false; "isSignal": true; }; "formReset": { "alias": "formReset"; "required": false; "isSignal": true; }; }, { "formBack": "formBack"; "formChange": "formChange"; "formSubmit": "formSubmit"; }, never, never, true, never>;
}
