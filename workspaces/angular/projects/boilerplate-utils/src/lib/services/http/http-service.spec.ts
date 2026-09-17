import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { HttpService } from './http-service';
import { API_BASE_URL } from '../../injection-tokens/api-base-url-injection-token';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: API_BASE_URL, useValue: 'https://api.example.com' }
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
