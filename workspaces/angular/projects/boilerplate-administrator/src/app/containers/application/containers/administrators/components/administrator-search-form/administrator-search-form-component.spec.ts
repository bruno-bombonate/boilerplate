import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSearchFormComponent } from './administrator-search-form-component';

describe('AdministratorSearchFormComponent', () => {
  let component: AdministratorSearchFormComponent;
  let fixture: ComponentFixture<AdministratorSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
