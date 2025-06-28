import * as _angular_core from '@angular/core';
import { DestroyRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

declare class DestroyRefClass {
    readonly destroyRef: DestroyRef;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DestroyRefClass, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<DestroyRefClass, never, never, {}, {}, never, never, true, never>;
}

declare enum SearchParamType {
    Param = "paramMap",
    QueryParam = "queryParamMap"
}
declare enum SearchParamValueType {
    Number = "number",
    String = "string",
    Boolean = "boolean"
}
interface SearchParam {
    name: string;
    type: SearchParamType;
    valueType: SearchParamValueType;
    valueDefault?: number | string | boolean;
}

declare class ListContainerClass extends DestroyRefClass implements OnInit {
    protected readonly activatedRoute: ActivatedRoute;
    protected readonly router: Router;
    readonly listSearchParamsList: SearchParam[];
    readonly listSearchParams: _angular_core.WritableSignal<any>;
    readonly list: _angular_core.WritableSignal<any[]>;
    readonly listLength: _angular_core.WritableSignal<number>;
    readonly listLoading: _angular_core.WritableSignal<boolean>;
    protected setListSearchParams(): void;
    protected getList(): void;
    protected addActivatedRouteQueryParamsListener(): void;
    ngOnInit(): void;
    handleListSearchFormChange(value: any): void;
    handleListPageChange(pageEvent: any): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ListContainerClass, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ListContainerClass, never, never, {}, {}, never, never, true, never>;
}

declare class ListComponentClass extends DestroyRefClass {
    readonly list: _angular_core.InputSignal<any[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ListComponentClass, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ListComponentClass, never, never, { "list": { "alias": "list"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class ViewComponentClass extends DestroyRefClass {
    readonly item: _angular_core.InputSignal<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ViewComponentClass, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ViewComponentClass, never, never, { "item": { "alias": "item"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class FormComponentClass extends DestroyRefClass implements OnChanges, OnInit {
    readonly form: _angular_core.InputSignal<any>;
    readonly formData: _angular_core.InputSignal<any>;
    readonly formLoading: _angular_core.InputSignal<boolean>;
    readonly formReset: _angular_core.InputSignal<Subject<void>>;
    readonly formBack: _angular_core.OutputEmitterRef<void>;
    readonly formChange: _angular_core.OutputEmitterRef<any>;
    readonly formSubmit: _angular_core.OutputEmitterRef<any>;
    protected mapInputValue(value: any): any;
    protected mapOutputValue(value: any): any;
    protected addFormValueChangesListener(): void;
    protected addFormResetListener(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngOnInit(): void;
    controlErrorMessageIsVisible(control: AbstractControl): boolean;
    handleNgSubmit(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FormComponentClass, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<FormComponentClass, never, never, { "form": { "alias": "form"; "required": false; "isSignal": true; }; "formData": { "alias": "formData"; "required": false; "isSignal": true; }; "formLoading": { "alias": "formLoading"; "required": false; "isSignal": true; }; "formReset": { "alias": "formReset"; "required": false; "isSignal": true; }; }, { "formBack": "formBack"; "formChange": "formChange"; "formSubmit": "formSubmit"; }, never, never, true, never>;
}

declare const transformNumber: (value: any) => null | number;

declare const transformString: (value: any) => null | string;

declare const transformBoolean: (value: any) => null | boolean;

declare const transform: (searchParam: SearchParam, searchParamValue: any) => any;

export { DestroyRefClass, FormComponentClass, ListComponentClass, ListContainerClass, SearchParamType, SearchParamValueType, ViewComponentClass, transform, transformBoolean, transformNumber, transformString };
export type { SearchParam };
