import { Route } from '@angular/router';
import { administratorsListRoute } from './containers/administrators-list/administrators-list.route';
import { administratorsAddRoute } from './containers/administrators-add/administrators-add.route';
import { administratorsDetailsRoute } from './containers/administrators-details/administrators-details.route';

export const administratorsRoute: Route = {
  path: 'administrators',
  title: 'Administrators',
  loadComponent: () => import('./administrators.component').then((component) => component.AdministratorsComponent),
  children: [
    administratorsListRoute,
    administratorsAddRoute,
    administratorsDetailsRoute,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: administratorsListRoute.path
    }
  ]
};
