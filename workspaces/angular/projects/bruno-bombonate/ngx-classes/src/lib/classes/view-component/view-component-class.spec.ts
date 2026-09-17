import { TestBed } from '@angular/core/testing';
import { ViewComponentClass } from './view-component-class';

describe('ViewComponentClass', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      expect(new ViewComponentClass()).toBeTruthy();
    });
  });
});
