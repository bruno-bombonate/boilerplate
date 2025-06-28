import { Route } from '@angular/router';

export const usersDetailsContainerRoutes: Route = {
  path: ':userId',
  title: 'User details',
  loadComponent: () => import('./users-details-container').then((component) => component.UsersDetailsContainer)
};
