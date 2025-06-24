import { Route } from '@angular/router';
import { usersListRoute } from './containers/users-list/users-list.route';
import { usersDetailsRoute } from './containers/users-details/users-details.route';

export const usersRoute: Route = {
  path: 'users',
  title: 'Users',
  loadComponent: () => import('./users.component').then((component) => component.UsersComponent),
  children: [
    usersListRoute,
    usersDetailsRoute,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: usersListRoute.path
    }
  ]
};
