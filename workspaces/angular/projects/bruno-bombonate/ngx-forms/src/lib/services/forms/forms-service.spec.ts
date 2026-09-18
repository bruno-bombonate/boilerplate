import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms-service';

describe('FormsService', () => {
  let service: FormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to the built-in Reactive Forms error messages', () => {
    expect(service.controlErrors['required'](undefined)).toBe('Please fill this field.');
  });

  it('should default to the built-in Signal Forms error messages', () => {
    expect(service.fieldErrors['required']({ kind: 'required' } as any)).toBe('Please fill this field.');
  });
});
