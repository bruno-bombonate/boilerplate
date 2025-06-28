import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '../../../../utils/interceptors/jwt/jwt-interceptor';
import { createErrorInterceptor } from '../../../../utils/interceptors/error/error-interceptor';
import { authenticationContainerRoutes } from './containers/authentication/authentication-container.routes';
import { signInContainerRoutes } from './containers/authentication/containers/sign-in/sign-in-container.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor,
        createErrorInterceptor(['/', authenticationContainerRoutes.path as string, signInContainerRoutes.path as string])
      ])
    )
  ]
};
