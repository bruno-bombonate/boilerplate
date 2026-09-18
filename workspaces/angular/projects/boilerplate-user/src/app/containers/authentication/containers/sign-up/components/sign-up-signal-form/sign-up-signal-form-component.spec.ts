import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpSignalFormComponent } from './sign-up-signal-form-component';

describe('SignUpSignalFormComponent', () => {
  let component: SignUpSignalFormComponent;
  let fixture: ComponentFixture<SignUpSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
