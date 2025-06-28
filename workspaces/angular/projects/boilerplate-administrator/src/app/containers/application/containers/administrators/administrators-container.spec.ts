import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsContainer } from './administrators-container';

describe('AdministratorsContainer', () => {
  let component: AdministratorsContainer;
  let fixture: ComponentFixture<AdministratorsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
