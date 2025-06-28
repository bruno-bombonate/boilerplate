import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTipComponent } from './control-tip-component';

describe('ControlTipComponent', () => {
  let component: ControlTipComponent;
  let fixture: ComponentFixture<ControlTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlTipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
