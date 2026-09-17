import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { SignUpContainer } from './sign-up-container';

describe('SignUpContainer', () => {
  let component: SignUpContainer;
  let fixture: ComponentFixture<SignUpContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
