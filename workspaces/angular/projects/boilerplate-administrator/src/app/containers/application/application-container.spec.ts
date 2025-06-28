import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationContainer } from './application-container';

describe('ApplicationContainer', () => {
  let component: ApplicationContainer;
  let fixture: ComponentFixture<ApplicationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
