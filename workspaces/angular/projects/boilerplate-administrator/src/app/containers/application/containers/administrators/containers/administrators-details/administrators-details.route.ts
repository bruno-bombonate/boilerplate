import { Route } from '@angular/router';

export const administratorsDetailsRoute: Route = {
  path: ':administratorId',
  title: 'Administrator details',
  loadComponent: () => import('./administrators-details.component').then((component) => component.AdministratorsDetailsComponent)
};
