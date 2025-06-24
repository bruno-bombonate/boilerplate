import { Route } from '@angular/router';
import { applicationGuard } from './application.guard';
import { dashboardRoute } from './containers/dashboard/dashboard.route';
import { usersRoute } from './containers/users/users.route';
import { administratorsRoute } from './containers/administrators/administrators.route';
import { profileRoute } from './containers/profile/profile.route';

export const applicationRoute: Route = {
  path: '',
  canActivate: [applicationGuard],
  loadComponent: () => import('./application.component').then((component) => component.ApplicationComponent),
  children: [
    dashboardRoute,
    usersRoute,
    administratorsRoute,
    profileRoute,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: dashboardRoute.path
    }
  ]
};
