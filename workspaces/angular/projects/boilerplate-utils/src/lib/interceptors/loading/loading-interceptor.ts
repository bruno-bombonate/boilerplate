import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading-service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (httpRequest, httpHandlerFn) => {

  const loadingService = inject(LoadingService);

  if (httpRequest.headers.get('Loading-Interceptor-Skip') === 'true') {
    return httpHandlerFn(httpRequest);
  }

  loadingService.addLoadingRequest();

  return httpHandlerFn(httpRequest)
    .pipe(
      finalize(() => {
        loadingService.removeLoadingRequest();
      })
    );

};
