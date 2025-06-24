import { Route } from '@angular/router';

export const dashboardRoute: Route = {
  path: 'dashboard',
  title: 'Dashboard',
  loadComponent: () => import('./dashboard.component').then((component) => component.DashboardComponent)
};
