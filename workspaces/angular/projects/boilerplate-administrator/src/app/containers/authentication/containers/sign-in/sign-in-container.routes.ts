import { Route } from '@angular/router';

export const signInContainerRoutes: Route = {
  path: 'sign-in',
  title: 'Sign in',
  loadComponent: () => import('./sign-in-container').then((component) => component.SignInContainer)
};
