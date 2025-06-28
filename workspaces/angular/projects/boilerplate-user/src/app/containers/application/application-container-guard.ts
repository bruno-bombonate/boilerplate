import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../../../../utils/services/user/user-service';
import { HttpService } from '../../utils/services/http/http-service';
import { tap, map } from 'rxjs';
import { authenticationContainerRoutes } from '../authentication/authentication-container.routes';
import { signInContainerRoutes } from '../authentication/containers/sign-in/sign-in-container.routes';

export const applicationContainerGuard: CanActivateFn = (activatedRouteSnapshot, routerStateSnapshot) => {

  const userService = inject(UserService);
  const httpService = inject(HttpService);
  const router = inject(Router);

  if (userService.userToken !== undefined) {
    return httpService.get({ url: 'users/me' })
      .pipe(
        tap((response: any) => userService.user = response.data),
        map(() => true)
      );
  }

  router.navigate(['/', authenticationContainerRoutes.path, signInContainerRoutes.path]);

  return false;

};
