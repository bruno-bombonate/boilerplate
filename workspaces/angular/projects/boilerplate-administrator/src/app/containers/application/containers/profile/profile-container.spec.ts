import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL, USER_TOKEN_STORAGE_KEY } from '@app/boilerplate-utils';
import { ApplicationContainer } from '../../application-container';

import { ProfileContainer } from './profile-container';

describe('ProfileContainer', () => {
  let component: ProfileContainer;
  let fixture: ComponentFixture<ProfileContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
        { provide: USER_TOKEN_STORAGE_KEY, useValue: 'boilerplate-administrator-token' },
        { provide: ApplicationContainer, useValue: { handleSignOut: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
