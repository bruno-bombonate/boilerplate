import { Routes } from '@angular/router';
import { authenticationContainerRoutes } from './containers/authentication/authentication-routes';
import { applicationContainerRoutes } from './containers/application/application-routes';

export const routes: Routes = [
  authenticationContainerRoutes,
  applicationContainerRoutes,
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: authenticationContainerRoutes.path,
  },
];
