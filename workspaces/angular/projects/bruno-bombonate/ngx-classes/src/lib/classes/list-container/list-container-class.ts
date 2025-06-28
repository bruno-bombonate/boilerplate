import { Directive, OnInit, inject, signal } from '@angular/core';
import { DestroyRefClass } from '../destroy-ref/destroy-ref-class';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParam, SearchParamType } from '../../interfaces/search-param-interface';
import { transform } from '../../functions/transform/transform-function';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export class ListContainerClass extends DestroyRefClass implements OnInit {

  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  public readonly listSearchParamsList: SearchParam[] = [];
  public readonly listSearchParams = signal<any>({});

  public readonly list = signal<any[]>([]);
  public readonly listLength = signal<number>(0);
  public readonly listLoading = signal<boolean>(false);

  protected setListSearchParams(): void {

    const listSearchParamsList = [ ... this.listSearchParamsList ];
    const listSearchParams: any = { };

    listSearchParamsList.forEach((searchParam) => {
      const searchParamValue = this.activatedRoute.snapshot[searchParam.type].get(searchParam.name);
      if (searchParamValue === null) {
        if (searchParam.valueDefault !== undefined) {
          listSearchParams[searchParam.name] = searchParam.valueDefault;
        }
      } else {
        listSearchParams[searchParam.name] = transform(searchParam, searchParamValue);
      }
    });

    this.listSearchParams.set(listSearchParams);

  }

  protected getList(): void { }

  protected addActivatedRouteQueryParamsListener(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getList();
      });
  }

  public ngOnInit(): void {
    this.setListSearchParams();
    this.addActivatedRouteQueryParamsListener();
  }

  public handleListSearchFormChange(value: any): void {

    const listSearchParams = { ... this.listSearchParams() };

    listSearchParams.page = 1;

    this.listSearchParamsList.forEach((searchParam) => {
      const searchParamValue = value[searchParam.name];
      if (searchParamValue !== undefined) {
        const searchParamValueTransformed = transform(searchParam, searchParamValue);
        if (searchParamValueTransformed === null) {
          delete listSearchParams[searchParam.name];
        } else {
          listSearchParams[searchParam.name] = searchParamValueTransformed;
        }
      }
    });

    const listSearchParamsExcludingTypeParam = { ... listSearchParams };

    this.listSearchParamsList.forEach((searchParams) => {
      if (searchParams.type === SearchParamType.Param) {
        delete listSearchParamsExcludingTypeParam[searchParams.name];
      }
    });

    this.listSearchParams.set(listSearchParams);

    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: listSearchParamsExcludingTypeParam });

  }

  public handleListPageChange(pageEvent: any): void {

    const listSearchParams = this.listSearchParams();

    listSearchParams.page = pageEvent.pageIndex + 1;

    const listSearchParamsExcludingTypeParam = { ... listSearchParams };

    this.listSearchParamsList.forEach((searchParams) => {
      if (searchParams.type === SearchParamType.Param) {
        delete listSearchParamsExcludingTypeParam[searchParams.name];
      }
    });

    this.listSearchParams.set(listSearchParams);

    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: listSearchParamsExcludingTypeParam });

  }

}
