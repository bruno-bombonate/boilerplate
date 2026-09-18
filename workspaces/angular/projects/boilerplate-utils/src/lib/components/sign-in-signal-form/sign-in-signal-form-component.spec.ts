import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInSignalFormComponent } from './sign-in-signal-form-component';

describe('SignInSignalFormComponent', () => {
  let component: SignInSignalFormComponent;
  let fixture: ComponentFixture<SignInSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
