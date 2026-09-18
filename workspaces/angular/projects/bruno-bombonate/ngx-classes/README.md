
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
|21.0.0|21.x|
|22.0.0|22.x|

Works with any Angular 22 version (`^22.0.0`), not just the exact minor/patch used to build this package.

## Usage

### ListContainerClass

List containers are responsible for fetching data from the server. Data presentation must be made at [child component](#listcomponentclass).

```typescript
import { Component, inject } from '@angular/core';
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
  styleUrl: './users-list.component.sass'
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

`ListContainerClass` gives you, ready to use in your template:

- `list: Signal<any[]>`, `listLength: Signal<number>`, `listLoading: Signal<boolean>` — set them yourself inside `getList()`, as shown above.
- `listSearchParams: Signal<any>` — the current search params, already read from the route and coerced to the right type (see `SearchParam` below). Pass it as `[formData]` to your search-form component.
- `handleListSearchFormChange(value: any): void` — bind it to your search-form's `(formChange)`. It merges `value` into the current search params, resets `page` back to `1`, and navigates (updating the URL's query params) — which in turn re-triggers `getList()` through the `queryParams` subscription set up by the base class.
- `handleListPageChange(pageEvent: any): void` — bind it to a paginator's page-change event (any object with a `pageIndex` property). Same idea as above, but only touches `page`.

#### The `SearchParam` array

Each entry in `listSearchParamsList` describes one filter/param your list understands:

```typescript
export enum SearchParamType {
  Param = 'paramMap',       // a route path segment, e.g. the :id in /users/:id
  QueryParam = 'queryParamMap' // a query string param, e.g. ?page=1
}

export enum SearchParamValueType {
  Number = 'number',
  String = 'string',
  Boolean = 'boolean'
}

export interface SearchParam {
  name: string;
  type: SearchParamType;
  valueType: SearchParamValueType;
  valueDefault?: number | string | boolean;
}
```

`type` decides whether the raw value is read from `activatedRoute.snapshot.paramMap` or `.queryParamMap`; `valueType` decides how the raw (always-a-string) value gets coerced — this coercion is done with the exported `transform`/`transformNumber`/`transformString`/`transformBoolean` functions, which you can also import and use on their own if you need the same string-to-typed-value coercion somewhere else in your app.

### ListComponentClass

List components are responsible for presenting data only. HTTP requests must be made at [parent component](#listcontainerclass).

```typescript
import { Component } from '@angular/core';
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
  styleUrl: './user-list.component.sass'
})
export class UserListComponent extends ListComponentClass { }
```

### ViewComponentClass

View components are responsible for presenting data only. HTTP requests must be made at parent component.

```typescript
import { Component } from '@angular/core';
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
  styleUrl: './user-view.component.sass'
})
export class UserViewComponent extends ViewComponentClass { }
```

### FormComponentClass

Form components are responsible for manipulating data and passing it on. HTTP requests must be made at [parent component](#destroyrefclass).

```typescript
import { Component, OnChanges, input } from '@angular/core';
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
  styleUrl: './user-form.component.sass'
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

`FormComponentClass` already wires up, so you only need to override `form` (and optionally `mapInputValue`/`mapOutputValue`):

- **Inputs**: `form` (your `FormGroup`, override it as shown above), `formData` (pass the record being edited; on its first change it's mapped through `mapInputValue` and patched into `form` without emitting `formChange`), `formLoading` (disable double-submits while `true` — it's checked by `handleNgSubmit`), `formReset` (a `Subject<void>`; call `.next()` on the instance you pass in to reset the form, e.g. after a successful non-navigating submit).
- **Outputs**: `formSubmit` (emits the value mapped through `mapOutputValue`, only when the form is valid and `formLoading` is `false`), `formChange` (emits on every value change, debounced 500ms, also mapped through `mapOutputValue` — bind it to `handleListSearchFormChange` of a [`ListContainerClass`](#listcontainerclass) for a live search form), `formBack` (not emitted by the base class itself — it's there for you to `emit()` from your own component when you add a cancel/back action, so callers have one consistent output to listen to).
- **`mapInputValue(value)` / `mapOutputValue(value)`** — override these `protected` methods when the shape of `formData` (coming from the API) doesn't match the shape `form` expects, or vice-versa (e.g. splitting/joining a nested `password` group, like the sign-up form in this project's own boilerplate does).
- **Submit with an invalid form**: `handleNgSubmit` (bind it to `(ngSubmit)` on your `<form>`) calls `form.markAllAsTouched()` and, if still invalid, scrolls the first control matching `.ng-invalid` **inside this component's own host element** into view — it won't reach into other components on the page, and it skips the `<form>` element itself (which also gets `.ng-invalid` from Angular when its group is invalid).

### SignalFormComponentClass

The Signal Forms (`@angular/forms/signals`) counterpart of `FormComponentClass`. It's a separate class, not an overload of the same one: a Reactive `FormGroup` is handed to `FormComponentClass` as a ready-made `input()`, but a Signal Forms formModel/schema is normally built inside the component itself via `signal()` + `form()`, so `formModel` and `form` are declared here as `abstract` properties for your component to define, not as inputs.

```typescript
import { Component, signal } from '@angular/core';
import { FormRoot, FormField, form, required, email } from '@angular/forms/signals';
import { ControlErrorComponent } from '@bruno-bombonate/ngx-forms';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface UserFormModel {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-form',
  imports: [
    // modules
    FormRoot,
    FormField,
    // components
    ControlErrorComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.sass'
})
export class UserFormComponent extends SignalFormComponentClass<UserFormModel> {

  protected override readonly formModel = signal<UserFormModel>({
    name: '',
    email: ''
  });

  protected override readonly form = form(this.formModel, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
  });

}
```

```html
<form [formRoot]="form" (submit)="handleSubmit()">
  <input [formField]="form.name" />
  <control-error [control]="form.name" />
  <input [formField]="form.email" type="email" />
  <control-error [control]="form.email" />
</form>
```

`FormRoot` and `FormField` are the directives Signal Forms itself provides (from `@angular/forms/signals`) — `[formRoot]` wires the `<form>` element up to the root field, and `[formField]` binds an individual input/select/textarea to a field.

- **Inputs**: `formData` (same role as in `FormComponentClass` — pass the record being edited; it's mapped through `mapInputValue` and merged into `formModel` without marking the field dirty, so it never triggers `formChange`), `formLoading`, `formReset` (a `Subject<void>`; call `.next()` to restore `formModel` to the value it had when the component was created and clear the field's touched/dirty state).
- **Outputs**: same three as `FormComponentClass` — `formSubmit`, `formChange` (debounced 500ms, only for edits the user actually made through a bound control, not for `formData` updates), `formBack`.
- **`formModel` / `form`** — declare these two `abstract` properties in your subclass, as shown above. `form` is what you bind to `[control]`/`[formRoot]` in the template and read for validation state; `formModel` is the plain signal holding the value.
- **CSS classes required for the submit-scroll behavior**: unlike Reactive Forms, Signal Forms does not add `ng-invalid`/`ng-touched`/etc. classes by default. Call [`provideNgxForms()`](../ngx-forms/README.md) in your `app.config.ts` (even with no arguments) so `handleSubmit`'s scroll-to-first-invalid-field behavior has a `.ng-invalid` class to look for.
- **`<control-error>`** (from `@bruno-bombonate/ngx-forms`) accepts a Signal Forms field the same way it accepts a Reactive `AbstractControl` — see [its README](../ngx-forms/README.md) for the dual-support details.

### DestroyRefClass

This is a wildcard class that you must extend ever where is a subscription, making it easier to unsubscribe using takeUntilDestroyed.

```typescript
import { Component, inject, signal } from '@angular/core';
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
  styleUrl: './users-add.component.sass'
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
