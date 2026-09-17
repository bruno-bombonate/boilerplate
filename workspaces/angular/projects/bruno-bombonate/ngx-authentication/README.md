
# @bruno-bombonate/ngx-authentication

A package with AuthenticationService, that you can set, get and unset authentication in Angular apps.

## Installation

```bash
npm install @bruno-bombonate/ngx-authentication
```

### Compatibility table

|@bruno-bombonate/ngx-authentication|Angular|
|-|-|
|1.0.0|15.x|
|2.0.0|16.x|
|3.0.0|17.x|
|18.0.0|18.x|
|19.0.0|19.x|
|20.0.0|20.x|
|21.0.0|21.x|

Works with any Angular 21 version (`^21.0.0`), not just the exact minor/patch used to build this package.

## Usage

`AuthenticationService` has four methods:

- `setAuthentication<T>(authentication: T, rememberMe: boolean): void` — stores `authentication` as JSON, in `localStorage` when `rememberMe` is `true`, in `sessionStorage` otherwise (so it's cleared when the browser tab closes).
- `getAuthentication<T>(): T | null` — reads back whatever was stored (checking `localStorage` first, then `sessionStorage`), parsed from JSON. Type it with the same shape you passed to `setAuthentication` (for example `getAuthentication<{ token: string }>()`). Returns `null` if nothing is stored, or when called on the server (SSR-safe: every method is a no-op outside the browser).
- `isLoggedIn(): boolean` — `true` if there's anything stored in either `localStorage` or `sessionStorage`, without parsing it. Cheaper than `getAuthentication() !== null` when you only need a yes/no answer (e.g. inside a route guard).
- `unsetAuthentication(): void` — removes the stored value from both `localStorage` and `sessionStorage`.

### sign-in.component.ts

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@bruno-bombonate/ngx-authentication';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {

  private readonly httpClient = inject(HttpClient);
  private readonly authenticationService = inject(AuthenticationService);

  public readonly formLoading = signal<boolean>(false);

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpClient.post('users/sign-in')
        .subscribe({
          next: (response: any) => {
            this.authenticationService.setAuthentication(response.data, value.rememberMe);
            this.formLoading.set(false);
          },
          error: (response: any) => {
            this.formLoading.set(false);
          }
        });
    }
  }

}
```

### my-account.component.ts

```typescript
import { Component } from '@angular/core';
import { AuthenticationService } from '@bruno-bombonate/ngx-authentication';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent {

  private readonly authenticationService = inject(AuthenticationService);

  public signOut(): void {
    this.authenticationService.unsetAuthentication();
  }

}
```

### application.guard.ts

```typescript
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '@bruno-bombonate/ngx-authentication';

export const applicationGuard: CanActivateFn = () => {

  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn() === true) {
    return true;
  }

  return router.createUrlTree(['/sign-in']);

};
```

`getAuthentication()` returns whatever object you originally passed to `setAuthentication` (for example `{ token: '...', user: { ... } }`), so you can read it wherever you need the stored token or user without making a network call:

```typescript
interface Authentication {
  token: string;
}

const authentication = authenticationService.getAuthentication<Authentication>();
const token = authentication?.token;
```
