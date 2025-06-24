import { Route } from '@angular/router';

export const resetPasswordRoute: Route = {
  path: 'reset-password',
  title: 'Reset password',
  loadComponent: () => import('./reset-password.component').then((component) => component.ResetPasswordComponent)
};
