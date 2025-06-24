import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsAddComponent } from './administrators-add.component';

describe('AdministratorsAddComponent', () => {
  let component: AdministratorsAddComponent;
  let fixture: ComponentFixture<AdministratorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
