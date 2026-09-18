import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministratorSignalFormComponent } from './administrator-signal-form-component';

describe('AdministratorSignalFormComponent', () => {
  let component: AdministratorSignalFormComponent;
  let fixture: ComponentFixture<AdministratorSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
