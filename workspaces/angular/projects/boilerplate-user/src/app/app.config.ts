import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '../../../../utils/interceptors/jwt/jwt.interceptor';
import { createErrorInterceptor } from '../../../../utils/interceptors/error/error.interceptor';
import { authenticationRoute } from './containers/authentication/authentication.route';
import { signInRoute } from './containers/authentication/containers/sign-in/sign-in.route';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor,
        createErrorInterceptor(['/', authenticationRoute.path as string, signInRoute.path as string])
      ])
    )
  ]
};
