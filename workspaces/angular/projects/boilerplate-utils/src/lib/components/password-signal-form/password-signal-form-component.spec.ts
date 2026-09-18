import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordSignalFormComponent } from './password-signal-form-component';

describe('PasswordSignalFormComponent', () => {
  let component: PasswordSignalFormComponent;
  let fixture: ComponentFixture<PasswordSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
