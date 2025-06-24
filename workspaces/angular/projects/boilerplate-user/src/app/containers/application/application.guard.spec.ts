import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { applicationGuard } from './application.guard';

describe('applicationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => applicationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
