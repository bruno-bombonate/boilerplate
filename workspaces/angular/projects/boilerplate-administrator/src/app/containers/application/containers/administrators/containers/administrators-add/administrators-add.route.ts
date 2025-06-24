import { Route } from '@angular/router';

export const administratorsAddRoute: Route = {
  path: 'add',
  title: 'Add administrator',
  loadComponent: () => import('./administrators-add.component').then((component) => component.AdministratorsAddComponent)
};
