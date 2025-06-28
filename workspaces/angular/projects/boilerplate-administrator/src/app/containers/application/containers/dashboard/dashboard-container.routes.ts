import { Route } from '@angular/router';

export const dashboardContainerRoutes: Route = {
  path: 'dashboard',
  title: 'Dashboard',
  loadComponent: () => import('./dashboard-container').then((component) => component.DashboardContainer)
};
