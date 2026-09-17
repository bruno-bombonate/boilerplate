import { TestBed } from '@angular/core/testing';
import { DestroyRefClass } from './destroy-ref-class';

describe('DestroyRefClass', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      expect(new DestroyRefClass()).toBeTruthy();
    });
  });
});
