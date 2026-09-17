import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor, createErrorInterceptor, loadingInterceptor, USER_TOKEN_STORAGE_KEY, API_BASE_URL } from '@app/boilerplate-utils';

import { routes } from './app.routes';
import { authenticationContainerRoutes } from './containers/authentication/authentication-routes';
import { signInContainerRoutes } from './containers/authentication/containers/sign-in/sign-in-routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor,
        createErrorInterceptor(['/', authenticationContainerRoutes.path as string, signInContainerRoutes.path as string]),
        loadingInterceptor,
      ]),
    ),
    { provide: USER_TOKEN_STORAGE_KEY, useValue: 'boilerplate-user-token' },
    { provide: API_BASE_URL, useValue: environment.baseUrl },
  ],
};
