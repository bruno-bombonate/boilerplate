import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdministratorsContainer } from './administrators-container';

describe('AdministratorsContainer', () => {
  let component: AdministratorsContainer;
  let fixture: ComponentFixture<AdministratorsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsContainer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
