import { Route } from '@angular/router';

export const usersListRoute: Route = {
  path: '',
  title: 'Users',
  loadComponent: () => import('./users-list.component').then((component) => component.UsersListComponent)
};
