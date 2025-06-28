import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsDetailsContainer } from './administrators-details-container';

describe('AdministratorsDetailsContainer', () => {
  let component: AdministratorsDetailsContainer;
  let fixture: ComponentFixture<AdministratorsDetailsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsDetailsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
