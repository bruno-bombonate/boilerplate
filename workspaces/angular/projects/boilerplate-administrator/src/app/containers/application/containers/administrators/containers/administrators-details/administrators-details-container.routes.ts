import { Route } from '@angular/router';

export const administratorsDetailsContainerRoutes: Route = {
  path: ':administratorId',
  title: 'Administrator details',
  loadComponent: () => import('./administrators-details-container').then((component) => component.AdministratorsDetailsContainer)
};
