import { Route } from '@angular/router';
import { applicationGuard } from './application.guard';
import { dashboardRoute } from './containers/dashboard/dashboard.route';
import { profileRoute } from './containers/profile/profile.route';

export const applicationRoute: Route = {
  path: '',
  canActivate: [applicationGuard],
  loadComponent: () => import('./application.component').then((component) => component.ApplicationComponent),
  children: [
    dashboardRoute,
    profileRoute,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: dashboardRoute.path
    }
  ]
};
