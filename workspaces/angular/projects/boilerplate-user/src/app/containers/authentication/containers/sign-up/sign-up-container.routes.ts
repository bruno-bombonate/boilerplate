import { Route } from '@angular/router';

export const signUpContainerRoutes: Route = {
  path: 'sign-up',
  title: 'Sign up',
  loadComponent: () => import('./sign-up-container').then((component) => component.SignUpContainer)
};
