import { Route } from '@angular/router';

export const administratorsListContainerRoutes: Route = {
  path: '',
  title: 'Administrators',
  loadComponent: () => import('./administrators-list-container').then((component) => component.AdministratorsListContainer)
};
