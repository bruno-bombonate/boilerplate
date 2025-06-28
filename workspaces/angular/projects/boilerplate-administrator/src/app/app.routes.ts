import { Routes } from '@angular/router';
import { authenticationContainerRoutes } from './containers/authentication/authentication-container.routes';
import { applicationContainerRoutes } from './containers/application/application-container.routes';

export const routes: Routes = [
  authenticationContainerRoutes,
  applicationContainerRoutes,
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: authenticationContainerRoutes.path
  }
];
