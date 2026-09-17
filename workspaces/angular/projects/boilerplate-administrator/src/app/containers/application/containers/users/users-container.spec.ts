import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UsersContainer } from './users-container';

describe('UsersContainer', () => {
  let component: UsersContainer;
  let fixture: ComponentFixture<UsersContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersContainer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
