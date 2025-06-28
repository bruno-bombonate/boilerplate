import { Route } from '@angular/router';
import { applicationContainerGuard } from './application-container-guard';
import { dashboardContainerRoutes } from './containers/dashboard/dashboard-container.routes';
import { profileContainerRoutes } from './containers/profile/profile-container.routes';

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
      redirectTo: dashboardContainerRoutes.path
    }
  ]
};
