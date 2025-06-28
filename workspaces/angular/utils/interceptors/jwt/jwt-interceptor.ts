import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user-service';

export const jwtInterceptor: HttpInterceptorFn = (httpRequest, httpHandlerFn) => {

  const userService = inject(UserService);

  if (userService.userToken !== undefined) {
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.userToken}`
      }
    });
  }

  return httpHandlerFn(httpRequest);

};
