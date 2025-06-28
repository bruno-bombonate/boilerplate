import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsListContainer } from './administrators-list-container';

describe('AdministratorsListContainer', () => {
  let component: AdministratorsListContainer;
  let fixture: ComponentFixture<AdministratorsListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsListContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
