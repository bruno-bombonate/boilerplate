import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { form, required } from '@angular/forms/signals';
import { signal } from '@angular/core';

import { ControlErrorComponent } from './control-error-component';

describe('ControlErrorComponent', () => {

  describe('with a Reactive Forms control', () => {

    let component: ControlErrorComponent;
    let fixture: ComponentFixture<ControlErrorComponent>;
    let control: FormControl;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ControlErrorComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ControlErrorComponent);
      component = fixture.componentInstance;
      control = new FormControl('', Validators.required);
      fixture.componentRef.setInput('control', control);
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should only show the error message once touched', () => {
      expect(component.controlErrorVisible()).toBe(false);
      control.markAsTouched();
      expect(component.controlErrorVisible()).toBe(true);
      expect(component.controlErrorMessage()).toBe('Please fill this field.');
    });

  });

  describe('with a Signal Forms field', () => {

    let component: ControlErrorComponent;
    let fixture: ComponentFixture<ControlErrorComponent>;
    let field: ReturnType<typeof form<{ name: string }>>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ControlErrorComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ControlErrorComponent);
      component = fixture.componentInstance;

      TestBed.runInInjectionContext(() => {
        field = form(signal({ name: '' }), (path) => {
          required(path.name);
        });
      });

      fixture.componentRef.setInput('control', field.name);
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should only show the error message once touched', () => {
      expect(component.controlErrorVisible()).toBe(false);
      field.name().markAsTouched();
      expect(component.controlErrorVisible()).toBe(true);
      expect(component.controlErrorMessage()).toBe('Please fill this field.');
    });

  });

});
