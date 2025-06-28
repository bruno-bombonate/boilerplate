import { Route } from '@angular/router';
import { signInContainerRoutes } from './containers/sign-in/sign-in-container.routes';
import { resetPasswordContainerRoutes } from './containers/reset-password/reset-password-container.routes';

export const authenticationContainerRoutes: Route = {
  path: 'auth',
  loadComponent: () => import('./authentication-container').then((component) => component.AuthenticationContainer),
  children: [
    signInContainerRoutes,
    resetPasswordContainerRoutes,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: signInContainerRoutes.path
    }
  ]
};
