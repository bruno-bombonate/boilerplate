import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly platformId = inject(PLATFORM_ID);

  public setAuthentication(authentication: any, rememberMe: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      authentication = JSON.stringify(authentication);
      rememberMe
        ? localStorage.setItem('authentication', authentication)
        : sessionStorage.setItem('authentication', authentication);
    }
  }

  public getAuthentication(): null | any {
    let authentication = null;
    if (isPlatformBrowser(this.platformId)) {
      const localStorageAuthentication = localStorage.getItem('authentication');
      const sessionStorageAuthentication = sessionStorage.getItem('authentication');
      if (localStorageAuthentication) {
        authentication = JSON.parse(localStorageAuthentication);
      } else if (sessionStorageAuthentication) {
        authentication = JSON.parse(sessionStorageAuthentication);
      }
    }
    return authentication;
  }

  public unsetAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authentication');
      sessionStorage.removeItem('authentication');
    }
  }

  public isLoggedIn(): boolean {
    let isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      const localStorageAuthentication = localStorage.getItem('authentication');
      const sessionStorageAuthentication = sessionStorage.getItem('authentication');
      isLoggedIn = localStorageAuthentication || sessionStorageAuthentication ? true : false;
    }
    return isLoggedIn;
  }

}
