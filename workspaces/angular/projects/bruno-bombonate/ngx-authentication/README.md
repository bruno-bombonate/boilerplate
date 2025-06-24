
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

## Usage

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
