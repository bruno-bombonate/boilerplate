import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { AdministratorsDetailsContainer } from './administrators-details-container';

describe('AdministratorsDetailsContainer', () => {
  let component: AdministratorsDetailsContainer;
  let fixture: ComponentFixture<AdministratorsDetailsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsDetailsContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorsDetailsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
