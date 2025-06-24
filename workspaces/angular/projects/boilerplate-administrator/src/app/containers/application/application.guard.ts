import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../../../../utils/services/user/user.service';
import { HttpService } from '../../utils/services/http/http.service';
import { tap, map } from 'rxjs';
import { authenticationRoute } from '../authentication/authentication.route';
import { signInRoute } from '../authentication/containers/sign-in/sign-in.route';

export const applicationGuard: CanActivateFn = (activatedRouteSnapshot, routerStateSnapshot) => {

  const userService = inject(UserService);
  const httpService = inject(HttpService);
  const router = inject(Router);

  if (userService.userToken !== undefined) {
    return httpService.get({ url: 'administrators/me' })
      .pipe(
        tap((response: any) => userService.user = response.data),
        map(() => true)
      );
  }

  router.navigate(['/', authenticationRoute.path, signInRoute.path]);

  return false;

};
