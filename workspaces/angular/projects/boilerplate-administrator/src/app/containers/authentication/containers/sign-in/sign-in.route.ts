import { Route } from '@angular/router';

export const signInRoute: Route = {
  path: 'sign-in',
  title: 'Sign in',
  loadComponent: () => import('./sign-in.component').then((component) => component.SignInComponent)
};
