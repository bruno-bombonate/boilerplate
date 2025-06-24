import { Route } from '@angular/router';

export const profileRoute: Route = {
  path: 'profile',
  title: 'Profile',
  loadComponent: () => import('./profile.component').then((component) => component.ProfileComponent)
};
