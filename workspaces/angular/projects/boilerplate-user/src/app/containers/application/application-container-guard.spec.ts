import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { applicationContainerGuard } from './application-container-guard';

describe('applicationContainerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => applicationContainerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
