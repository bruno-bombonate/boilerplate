import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/boilerplate-utils';

import { AdministratorsAddContainer } from './administrators-add-container';

describe('AdministratorsAddContainer', () => {
  let component: AdministratorsAddContainer;
  let fixture: ComponentFixture<AdministratorsAddContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsAddContainer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://localhost' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorsAddContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
