import { Route } from '@angular/router';

export const usersListContainerRoutes: Route = {
  path: '',
  title: 'Users',
  loadComponent: () => import('./users-list-container').then((component) => component.UsersListContainer)
};
