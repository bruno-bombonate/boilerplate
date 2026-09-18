import { Service, inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const USER_TOKEN_STORAGE_KEY = new InjectionToken<string>('userTokenStorageKey');

@Service()
export class UserService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly userTokenStorageKey = inject(USER_TOKEN_STORAGE_KEY);

  private readonly userBehaviorSubject: BehaviorSubject<undefined | any> = new BehaviorSubject(undefined);

  public get userToken(): undefined | string {
    if (isPlatformBrowser(this.platformId) === true) {
      const userToken = localStorage.getItem(this.userTokenStorageKey);
      if (userToken !== null) {
        return userToken;
      }
    }
    return undefined;
  }

  public set userToken(userToken: undefined | string) {
    if (isPlatformBrowser(this.platformId) === true) {
      if (userToken !== undefined) {
        localStorage.setItem(this.userTokenStorageKey, userToken);
      } else {
        localStorage.removeItem(this.userTokenStorageKey);
      }
    }
  }

  public get user(): undefined | any {
    return this.userBehaviorSubject.getValue();
  }

  public get user$(): Observable<undefined | any> {
    return this.userBehaviorSubject.asObservable();
  }

  public set user(user: undefined | any) {
    this.userBehaviorSubject.next(user);
  }

  public signOut(): void {
    this.userToken = undefined;
    this.user = undefined;
  }

}
