
# @app/boilerplate-utils

Internal, unpublished library shared between `boilerplate-user` and `boilerplate-administrator`. Not published to npm — replaces the old `utils/` folder that was shared between apps via relative imports.

## Contents

- `UserService` — reactive user/token state. Requires each app to provide `USER_TOKEN_STORAGE_KEY` (an `InjectionToken<string>`) with an app-specific value, so the two apps never share the same `localStorage` key.
- `HttpService` — thin wrapper around `HttpClient` with caching and a `Loading-Interceptor-Skip` header (set automatically when a call passes `{ loading: false }`). Requires each app to provide `API_BASE_URL` (an `InjectionToken<string>`) with its own API URL.
- `LoadingService` — tracks how many HTTP requests are in flight (`addLoadingRequest()`/`removeLoadingRequest()`), exposing a `loading: Signal<boolean>` for a global loading indicator.
- `jwtInterceptor` — adds the `Authorization: Bearer <token>` header when there's a token.
- `createErrorInterceptor(authRoute)` — on `401`, signs the user out and navigates to `authRoute`. Always rethrows the **raw** `HttpErrorResponse` (no unwrapping) — read the API's error body at the call site as `response.error.message`, not `response.message`.
- `loadingInterceptor` — increments/decrements `LoadingService` around every request, skipped for a given call when `HttpService` sets the `Loading-Interceptor-Skip` header (i.e. `{ loading: false }`).
- `createApplicationContainerGuard(meEndpoint, signInRoute)` — route guard factory for the authenticated area. Parametrized because the two apps hit different "who am I" endpoints (`users/me` vs `administrators/me`) and have their own sign-in route.
- `StatusPipe` — `boolean` to `Active`/`Inactive`/`-` label.
- `passwordConfirmation` — reactive forms cross-field validator.
- `NavClass` — base directive for GSAP-animated nav menus.
- `SignInFormComponent`, `ResetPasswordFormComponent`, `ResetPasswordRequestFormComponent`, `PasswordFormComponent`, `ProfileViewComponent` — shared authentication/profile form and view components.

## Usage

### app.config.ts

```typescript
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor, createErrorInterceptor, loadingInterceptor, USER_TOKEN_STORAGE_KEY, API_BASE_URL } from '@app/boilerplate-utils';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor,
        createErrorInterceptor(['/', 'auth', 'sign-in']),
        loadingInterceptor,
      ]),
    ),
    { provide: USER_TOKEN_STORAGE_KEY, useValue: 'boilerplate-user-token' },
    { provide: API_BASE_URL, useValue: environment.baseUrl },
    // ...
  ]
};
```

### Reading the global loading state

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@app/boilerplate-utils';

@Component({
  selector: 'app-root',
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly loadingService = inject(LoadingService);
}
```

```html
@if (loadingService.loading() === true) {
  <div class="loading-bar"></div>
}
```

### application-container.routes.ts

```typescript
import { createApplicationContainerGuard } from '@app/boilerplate-utils';

export const applicationContainerGuard = createApplicationContainerGuard('users/me', ['/', 'authentication', 'sign-in']);
```
