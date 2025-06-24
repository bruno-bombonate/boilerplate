import { Route } from '@angular/router';

export const signUpRoute: Route = {
  path: 'sign-up',
  title: 'Sign up',
  loadComponent: () => import('./sign-up.component').then((component) => component.SignUpComponent)
};
