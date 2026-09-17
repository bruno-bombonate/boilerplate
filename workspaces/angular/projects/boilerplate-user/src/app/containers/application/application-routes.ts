import { Route } from '@angular/router';
import { createApplicationContainerGuard } from '@app/boilerplate-utils';
import { dashboardContainerRoutes } from './containers/dashboard/dashboard-routes';
import { profileContainerRoutes } from './containers/profile/profile-routes';
import { authenticationContainerRoutes } from '../authentication/authentication-routes';
import { signInContainerRoutes } from '../authentication/containers/sign-in/sign-in-routes';

export const applicationContainerGuard = createApplicationContainerGuard('users/me', [
  '/',
  authenticationContainerRoutes.path as string,
  signInContainerRoutes.path as string,
]);

export const applicationContainerRoutes: Route = {
  path: '',
  canActivate: [applicationContainerGuard],
  loadComponent: () => import('./application-container').then((component) => component.ApplicationContainer),
  children: [
    dashboardContainerRoutes,
    profileContainerRoutes,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: dashboardContainerRoutes.path,
    },
  ],
};
