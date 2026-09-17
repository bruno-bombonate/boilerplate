import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL, USER_TOKEN_STORAGE_KEY } from '@app/boilerplate-utils';

import { SignInContainer } from './sign-in-container';

describe('SignInContainer', () => {
  let component: SignInContainer;
  let fixture: ComponentFixture<SignInContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
        { provide: USER_TOKEN_STORAGE_KEY, useValue: 'boilerplate-user-token' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
