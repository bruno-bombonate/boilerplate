import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loading false', () => {
    expect(service.loading()).toBe(false);
  });

  it('should become true after a loading request is added', () => {
    service.addLoadingRequest();
    expect(service.loading()).toBe(true);
  });

  it('should stay true while at least one loading request is still pending', () => {
    service.addLoadingRequest();
    service.addLoadingRequest();
    service.removeLoadingRequest();
    expect(service.loading()).toBe(true);
  });

  it('should become false once every loading request is removed', () => {
    service.addLoadingRequest();
    service.addLoadingRequest();
    service.removeLoadingRequest();
    service.removeLoadingRequest();
    expect(service.loading()).toBe(false);
  });

  it('should not go negative if removed more times than added', () => {
    service.removeLoadingRequest();
    service.addLoadingRequest();
    service.removeLoadingRequest();
    expect(service.loading()).toBe(false);
  });
});
