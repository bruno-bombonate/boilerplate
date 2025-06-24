import { DestroyRefClass } from './destroy-ref.class';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParam } from '../interfaces/search-param.interface';
import * as i0 from "@angular/core";
export declare class ListContainerClass extends DestroyRefClass {
    protected readonly activatedRoute: ActivatedRoute;
    protected readonly router: Router;
    readonly listSearchParamsList: SearchParam[];
    readonly listSearchParams: import("@angular/core").WritableSignal<any>;
    readonly list: import("@angular/core").WritableSignal<any[]>;
    readonly listLength: import("@angular/core").WritableSignal<number>;
    readonly listLoading: import("@angular/core").WritableSignal<boolean>;
    protected setListSearchParams(): void;
    protected getList(): void;
    ngOnInit(): void;
    handleListSearchFormChange(value: any): void;
    handleListPageChange(pageEvent: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListContainerClass, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListContainerClass, never, never, {}, {}, never, never, true, never>;
}
