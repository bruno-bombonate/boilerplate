import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewComponent } from './user-view-component';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', { id: 1, name: 'Name', email: 'name@example.com', status: true, createdAt: new Date() });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
