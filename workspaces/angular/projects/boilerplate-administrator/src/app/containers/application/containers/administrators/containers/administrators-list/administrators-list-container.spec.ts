import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { AdministratorsListContainer } from './administrators-list-container';

describe('AdministratorsListContainer', () => {
  let component: AdministratorsListContainer;
  let fixture: ComponentFixture<AdministratorsListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsListContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorsListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
