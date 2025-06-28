import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpContainer } from './sign-up-container';

describe('SignUpContainer', () => {
  let component: SignUpContainer;
  let fixture: ComponentFixture<SignUpContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
