import { Route } from '@angular/router';
import { usersListContainerRoutes } from './containers/users-list/users-list-routes';
import { usersDetailsContainerRoutes } from './containers/users-details/users-details-routes';

export const usersContainerRoutes: Route = {
  path: 'users',
  title: 'Users',
  loadComponent: () => import('./users-container').then((component) => component.UsersContainer),
  children: [
    usersListContainerRoutes,
    usersDetailsContainerRoutes,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: usersListContainerRoutes.path,
    },
  ],
};
