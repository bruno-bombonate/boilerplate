import * as i0 from '@angular/core';

declare class AuthenticationService {
    private readonly platformId;
    setAuthentication(authentication: any, rememberMe: boolean): void;
    getAuthentication(): null | any;
    unsetAuthentication(): void;
    isLoggedIn(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthenticationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthenticationService>;
}

export { AuthenticationService };
