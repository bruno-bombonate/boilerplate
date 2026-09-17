import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { FormComponentClass } from './form-component-class';

describe('FormComponentClass', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }],
    });
    TestBed.runInInjectionContext(() => {
      expect(new FormComponentClass()).toBeTruthy();
    });
  });
});
