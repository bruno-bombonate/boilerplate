import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsAddContainer } from './administrators-add-container';

describe('AdministratorsAddContainer', () => {
  let component: AdministratorsAddContainer;
  let fixture: ComponentFixture<AdministratorsAddContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsAddContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsAddContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
