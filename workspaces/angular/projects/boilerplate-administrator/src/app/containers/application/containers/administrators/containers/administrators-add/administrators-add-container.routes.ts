import { Route } from '@angular/router';

export const administratorsAddContainerRoutes: Route = {
  path: 'add',
  title: 'Add administrator',
  loadComponent: () => import('./administrators-add-container').then((component) => component.AdministratorsAddContainer)
};
