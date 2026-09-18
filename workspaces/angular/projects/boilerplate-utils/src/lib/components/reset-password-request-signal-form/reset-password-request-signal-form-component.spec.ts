import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordRequestSignalFormComponent } from './reset-password-request-signal-form-component';

describe('ResetPasswordRequestSignalFormComponent', () => {
  let component: ResetPasswordRequestSignalFormComponent;
  let fixture: ComponentFixture<ResetPasswordRequestSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordRequestSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordRequestSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
