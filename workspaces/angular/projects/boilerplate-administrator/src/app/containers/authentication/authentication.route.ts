import { Route } from '@angular/router';
import { signInRoute } from './containers/sign-in/sign-in.route';
import { resetPasswordRoute } from './containers/reset-password/reset-password.route';

export const authenticationRoute: Route = {
  path: 'auth',
  loadComponent: () => import('./authentication.component').then((component) => component.AuthenticationComponent),
  children: [
    signInRoute,
    resetPasswordRoute,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: signInRoute.path
    }
  ]
};
