import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const createErrorInterceptor = (authRoute: string[]): HttpInterceptorFn => {

  return (httpRequest, httpHandlerFn) => {
  
    const userService = inject(UserService);
    const router = inject(Router);
  
    return httpHandlerFn(httpRequest)
      .pipe(
        catchError((response) => {
          if (response.status === 401) {
            userService.signOut();
            router.navigate(authRoute);
          }
          return throwError(() => response.error || response);
        })
      );
  
  };

};
