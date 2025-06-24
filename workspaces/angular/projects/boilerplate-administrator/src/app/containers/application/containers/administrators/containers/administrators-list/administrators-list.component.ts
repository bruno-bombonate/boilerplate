import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AdministratorSearchFormComponent } from '../../components/administrator-search-form/administrator-search-form.component';
import { AdministratorListComponent } from '../../components/administrator-list/administrator-list.component';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { ListContainerClass, SearchParamType, SearchParamValueType } from '@bruno-bombonate/ngx-classes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-administrators-list',
  imports: [
    // components
    AdministratorSearchFormComponent,
    AdministratorListComponent,
    // directives
    RouterLink
  ],
  templateUrl: './administrators-list.component.html',
  styleUrl: './administrators-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsListComponent extends ListContainerClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);

  public override listSearchParamsList = [
    { name: 'page', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number, valueDefault: 1 },
    { name: 'limit', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number, valueDefault: 20 },
    { name: 'orderBy', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String, valueDefault: 'administratorId' },
    { name: 'orderByDirection', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String, valueDefault: 'ASC' },
    { name: 'administratorId', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number },
    { name: 'administratorName', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String },
    { name: 'administratorEmail', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String },
    { name: 'administratorStatus', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Boolean }
  ];

  protected override getList(): void {
    if (this.listLoading() === false) {
      this.listLoading.set(true);
      this.httpService.get({ url: 'administrators', params: this.listSearchParams() })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.list.set(response.data);
            this.listLength.set(response.length);
            this.listLoading.set(false);
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.listLoading.set(false);
          }
        });
    }
  }

}
