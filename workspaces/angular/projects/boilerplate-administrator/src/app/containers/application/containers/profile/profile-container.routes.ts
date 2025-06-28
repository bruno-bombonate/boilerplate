import { Route } from '@angular/router';

export const profileContainerRoutes: Route = {
  path: 'profile',
  title: 'Profile',
  loadComponent: () => import('./profile-container').then((component) => component.ProfileContainer)
};
