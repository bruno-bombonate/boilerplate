import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form-component';
import { UserListComponent } from '../../components/user-list/user-list-component';
import { ListContainerClass, SearchParamType, SearchParamValueType } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http-service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-list-container',
  imports: [
    // components
    UserSearchFormComponent,
    UserListComponent
  ],
  templateUrl: './users-list-container.html',
  styleUrl: './users-list-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListContainer extends ListContainerClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);

  public override listSearchParamsList = [
    { name: 'page', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number, valueDefault: 1 },
    { name: 'limit', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number, valueDefault: 20 },
    { name: 'orderBy', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String, valueDefault: 'userId' },
    { name: 'orderByDirection', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String, valueDefault: 'ASC' },
    { name: 'userId', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Number },
    { name: 'userName', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String },
    { name: 'userEmail', type: SearchParamType.QueryParam, valueType: SearchParamValueType.String },
    { name: 'userStatus', type: SearchParamType.QueryParam, valueType: SearchParamValueType.Boolean }
  ];

  protected override getList(): void {
    if (this.listLoading() === false) {
      this.listLoading.set(true);
      this.httpService.get({ url: 'users', params: this.listSearchParams() })
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
