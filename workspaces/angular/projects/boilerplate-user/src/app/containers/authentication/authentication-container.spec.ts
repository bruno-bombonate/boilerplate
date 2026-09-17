import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthenticationContainer } from './authentication-container';

describe('AuthenticationContainer', () => {
  let component: AuthenticationContainer;
  let fixture: ComponentFixture<AuthenticationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationContainer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
