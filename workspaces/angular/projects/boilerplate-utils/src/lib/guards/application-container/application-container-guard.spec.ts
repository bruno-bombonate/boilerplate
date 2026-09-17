import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { createApplicationContainerGuard } from './application-container-guard';
import { API_BASE_URL } from '../../injection-tokens/api-base-url-injection-token';
import { USER_TOKEN_STORAGE_KEY } from '../../services/user/user-service';

describe('applicationContainerGuard', () => {
  const applicationContainerGuard = createApplicationContainerGuard('users/me', ['/sign-in']);

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => applicationContainerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: API_BASE_URL, useValue: 'https://api.example.com' },
        { provide: USER_TOKEN_STORAGE_KEY, useValue: 'test-token' }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
