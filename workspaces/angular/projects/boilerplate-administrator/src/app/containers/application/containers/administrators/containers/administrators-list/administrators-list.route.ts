import { Route } from '@angular/router';

export const administratorsListRoute: Route = {
  path: '',
  title: 'Administrators',
  loadComponent: () => import('./administrators-list.component').then((component) => component.AdministratorsListComponent)
};
