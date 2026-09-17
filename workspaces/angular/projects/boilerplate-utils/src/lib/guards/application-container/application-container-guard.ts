import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { HttpService } from '../../services/http/http-service';
import { tap, map } from 'rxjs';

export const createApplicationContainerGuard = (meEndpoint: string, signInRoute: string[]): CanActivateFn => {

  return () => {

    const userService = inject(UserService);
    const httpService = inject(HttpService);
    const router = inject(Router);

    if (userService.userToken !== undefined) {
      return httpService.get({ url: meEndpoint })
        .pipe(
          tap((response: any) => userService.user = response.data),
          map(() => true)
        );
    }

    return router.createUrlTree(signInRoute);

  };

};
