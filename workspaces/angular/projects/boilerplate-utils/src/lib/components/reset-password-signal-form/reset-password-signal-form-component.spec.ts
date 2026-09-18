import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordSignalFormComponent } from './reset-password-signal-form-component';

describe('ResetPasswordSignalFormComponent', () => {
  let component: ResetPasswordSignalFormComponent;
  let fixture: ComponentFixture<ResetPasswordSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
