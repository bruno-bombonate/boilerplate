import { Route } from '@angular/router';
import { signInContainerRoutes } from './containers/sign-in/sign-in-routes';
import { signUpContainerRoutes } from './containers/sign-up/sign-up-routes';
import { resetPasswordContainerRoutes } from './containers/reset-password/reset-password-routes';

export const authenticationContainerRoutes: Route = {
  path: 'auth',
  loadComponent: () => import('./authentication-container').then((component) => component.AuthenticationContainer),
  children: [
    signInContainerRoutes,
    signUpContainerRoutes,
    resetPasswordContainerRoutes,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: signInContainerRoutes.path,
    },
  ],
};
