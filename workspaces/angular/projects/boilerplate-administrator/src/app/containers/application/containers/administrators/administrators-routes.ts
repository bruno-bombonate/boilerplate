import { Route } from '@angular/router';
import { administratorsListContainerRoutes } from './containers/administrators-list/administrators-list-routes';
import { administratorsAddContainerRoutes } from './containers/administrators-add/administrators-add-routes';
import { administratorsDetailsContainerRoutes } from './containers/administrators-details/administrators-details-routes';

export const administratorsContainerRoutes: Route = {
  path: 'administrators',
  title: 'Administrators',
  loadComponent: () => import('./administrators-container').then((component) => component.AdministratorsContainer),
  children: [
    administratorsListContainerRoutes,
    administratorsAddContainerRoutes,
    administratorsDetailsContainerRoutes,
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: administratorsListContainerRoutes.path,
    },
  ],
};
