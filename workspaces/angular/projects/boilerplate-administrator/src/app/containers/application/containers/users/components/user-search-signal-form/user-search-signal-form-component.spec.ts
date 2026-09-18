import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchSignalFormComponent } from './user-search-signal-form-component';

describe('UserSearchSignalFormComponent', () => {
  let component: UserSearchSignalFormComponent;
  let fixture: ComponentFixture<UserSearchSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSearchSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
