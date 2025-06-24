import { Route } from '@angular/router';

export const usersDetailsRoute: Route = {
  path: ':userId',
  title: 'User details',
  loadComponent: () => import('./users-details.component').then((component) => component.UsersDetailsComponent)
};
