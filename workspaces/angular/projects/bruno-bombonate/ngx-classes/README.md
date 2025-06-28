
# @bruno-bombonate/ngx-classes

A package with base classes that are frequently used in my Angular projects.

## Installation

```bash
npm install @bruno-bombonate/ngx-classes
```

### Compatibility table

|@bruno-bombonate/ngx-classes|Angular|
|-|-|
|1.2.0|15.x|
|2.0.0|16.x|
|3.0.0|17.x|
|18.0.0|18.x|
|19.0.0|19.x|
|20.0.0|20.x|

## Usage

### ListContainerClass

List containers are responsible for fetching data from the server. Data presentation must be made at [child component](#listcomponentclass).

```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { ListContainerClass, SearchParamType, SearchParamValueType } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-list',
  imports: [
    // components
    UserSearchFormComponent,
    UserListComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends ListContainerClass {

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
```

### ListComponentClass

List components are responsible for presenting data only. HTTP requests must be made at [parent component](#listcontainerclass).

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '../../../../../../../../../../utils/pipes/status/status.pipe';
import { ListComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-list',
  imports: [
    // directives
    RouterLink,
    // pipes
    StatusPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent extends ListComponentClass { }
```

### ViewComponentClass

View components are responsible for presenting data only. HTTP requests must be made at parent component.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusPipe } from '../../../../../../../../../../utils/pipes/status/status.pipe';
import { ViewComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-view',
  imports: [
    // pipes
    DatePipe,
    StatusPipe
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent extends ViewComponentClass { }
```

### FormComponentClass

Form components are responsible for manipulating data and passing it on. HTTP requests must be made at [parent component](#destroyrefclass).

```typescript
import { Component, ChangeDetectionStrategy, OnChanges, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { FormComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-form',
  imports: [
    // modules
    ReactiveFormsModule,
    // components
    ControlErrorComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends FormComponentClass implements OnChanges {
  
  public override readonly form = input(
    new FormGroup({
      name: new FormControl<null | string>(null, [Validators.required]),
      email: new FormControl<null | string>(null, [Validators.required, Validators.email]),
      password: new FormControl<null | string>(null, [Validators.required])
    })
  );

}
```

### DestroyRefClass

This is a wildcard class that you must extend ever where is a subscription, making it easier to unsubscribe using takeUntilDestroyed.

```typescript
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-add',
  imports: [
    // components
    UserFormComponent
  ],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersAddComponent extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly formLoading = signal<boolean>(false);

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'users', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
```
