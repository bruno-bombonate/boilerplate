import { TestBed } from '@angular/core/testing';
import { NavClass } from './nav-class';

describe('NavClass', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      expect(new NavClass()).toBeTruthy();
    });
  });
});
