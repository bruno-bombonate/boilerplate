import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsContainer } from './users-details-container';

describe('UsersDetailsContainer', () => {
  let component: UsersDetailsContainer;
  let fixture: ComponentFixture<UsersDetailsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
