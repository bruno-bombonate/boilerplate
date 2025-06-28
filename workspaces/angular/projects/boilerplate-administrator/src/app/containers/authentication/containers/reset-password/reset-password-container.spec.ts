import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordContainer } from './reset-password-container';

describe('ResetPasswordContainer', () => {
  let component: ResetPasswordContainer;
  let fixture: ComponentFixture<ResetPasswordContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
