import { TestBed } from '@angular/core/testing';

import { UserService, USER_TOKEN_STORAGE_KEY } from './user-service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: USER_TOKEN_STORAGE_KEY, useValue: 'test-token' }]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
