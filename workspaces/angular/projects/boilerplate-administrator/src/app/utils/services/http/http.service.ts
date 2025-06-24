import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { cloneDeep } from 'lodash';
import { environment } from '../../../../environments/environment';
import { switchMap } from 'rxjs/operators';

interface RequestOptions {
  url: string;
  headers?: HttpHeaders;
  loading?: boolean;
  responseType?: string;
}

interface GetRequestOptions extends RequestOptions {
  params?: HttpParams | { [key: string]: string | string[] };
  cache?: boolean;
}

interface PostRequestOptions extends RequestOptions {
  body: any;
  cache?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly httpClient = inject(HttpClient);
  private readonly cache = new Map<string, any>();

  private getCacheKey(url: string, body?: any, params?: HttpParams | { [key: string]: string | string[] }): string {
    return JSON.stringify({ url, body, params });
  }

  private request<T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', options: any): Observable<T> {

    let request: Observable<T>;
    let cacheKey = '';
    let headers = options.headers || new HttpHeaders();

    if (method === 'GET' || method === 'POST') {
      cacheKey = this.getCacheKey(options.url, options.body, options.params);
      if (options.cache && this.cache.has(cacheKey)) {
        return of(cloneDeep(this.cache.get(cacheKey)));
      }
    }

    if (options.loading === false) {
      headers = headers.set('Loading-Interceptor-Skip', 'true');
    }

    switch (method) {
      case 'GET':
        request = this.httpClient.get<T>(`${environment.baseUrl}/${options.url}`, { headers, params: options.params, responseType: options.responseType });
        break;
      case 'POST':
        request = this.httpClient.post<T>(`${environment.baseUrl}/${options.url}`, options.body, { headers, responseType: options.responseType });
        break;
      case 'PUT':
        request = this.httpClient.put<T>(`${environment.baseUrl}/${options.url}`, options.body, { headers, responseType: options.responseType });
        break;
      case 'PATCH':
        request = this.httpClient.patch<T>(`${environment.baseUrl}/${options.url}`, options.body, { headers, responseType: options.responseType });
        break;
      case 'DELETE':
        request = this.httpClient.delete<T>(`${environment.baseUrl}/${options.url}`, { headers, params: options.params, responseType: options.responseType });
        break;
      default:
        throw new Error('Unspecified or invalid HTTP method.');
    }

    return request
      .pipe(
        switchMap(response => {
          if ((method === 'GET' || method === 'POST') && options.cache) {
            this.cache.set(cacheKey, response);
          }
          return of(cloneDeep(response));
        })
      );

  }

  public get<T>(options: GetRequestOptions): Observable<T> {
    return this.request<T>('GET', options);
  }

  public post<T>(options: PostRequestOptions): Observable<T> {
    return this.request<T>('POST', options);
  }

  public put<T>(options: PostRequestOptions): Observable<T> {
    return this.request<T>('PUT', options);
  }
  
  public patch<T>(options: PostRequestOptions): Observable<T> {
    return this.request<T>('PATCH', options);
  }

  public delete<T>(options: RequestOptions): Observable<T> {
    return this.request<T>('DELETE', options);
  }

}
