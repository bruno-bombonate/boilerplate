import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationContainer } from './authentication-container';

describe('AuthenticationContainer', () => {
  let component: AuthenticationContainer;
  let fixture: ComponentFixture<AuthenticationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
