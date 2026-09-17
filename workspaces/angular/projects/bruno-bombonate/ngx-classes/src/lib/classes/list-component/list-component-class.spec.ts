import { TestBed } from '@angular/core/testing';
import { ListComponentClass } from './list-component-class';

describe('ListComponentClass', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      expect(new ListComponentClass()).toBeTruthy();
    });
  });
});
