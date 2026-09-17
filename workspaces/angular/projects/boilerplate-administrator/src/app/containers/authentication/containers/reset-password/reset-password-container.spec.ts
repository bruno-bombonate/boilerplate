import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { ResetPasswordContainer } from './reset-password-container';

describe('ResetPasswordContainer', () => {
  let component: ResetPasswordContainer;
  let fixture: ComponentFixture<ResetPasswordContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
