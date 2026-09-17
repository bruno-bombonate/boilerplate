import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListContainerClass } from './list-container-class';

describe('ListContainerClass', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      expect(new ListContainerClass()).toBeTruthy();
    });
  });

});
