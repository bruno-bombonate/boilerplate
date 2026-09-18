import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministratorSearchSignalFormComponent } from './administrator-search-signal-form-component';

describe('AdministratorSearchSignalFormComponent', () => {
  let component: AdministratorSearchSignalFormComponent;
  let fixture: ComponentFixture<AdministratorSearchSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorSearchSignalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorSearchSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
