import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsDetailsComponent } from './administrators-details.component';

describe('AdministratorsDetailsComponent', () => {
  let component: AdministratorsDetailsComponent;
  let fixture: ComponentFixture<AdministratorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
