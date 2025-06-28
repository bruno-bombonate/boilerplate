import { Route } from '@angular/router';

export const resetPasswordContainerRoutes: Route = {
  path: 'reset-password',
  title: 'Reset password',
  loadComponent: () => import('./reset-password-container').then((component) => component.ResetPasswordContainer)
};
