import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { UsersListContainer } from './users-list-container';

describe('UsersListContainer', () => {
  let component: UsersListContainer;
  let fixture: ComponentFixture<UsersListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
