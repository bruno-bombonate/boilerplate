import { Routes } from '@angular/router';
import { authenticationRoute } from './containers/authentication/authentication.route';
import { applicationRoute } from './containers/application/application.route';

export const routes: Routes = [
  authenticationRoute,
  applicationRoute,
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: authenticationRoute.path
  }
];
