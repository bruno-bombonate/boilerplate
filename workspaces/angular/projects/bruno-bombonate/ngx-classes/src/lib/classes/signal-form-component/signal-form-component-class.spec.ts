import { TestBed } from '@angular/core/testing';
import { ElementRef, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { SignalFormComponentClass } from './signal-form-component-class';

interface TestModel {
  name: string;
}

class TestSignalFormComponent extends SignalFormComponentClass<TestModel> {
  protected override readonly formModel = signal<TestModel>({ name: '' });
  protected override readonly form = form(this.formModel, (path) => {
    required(path.name);
  });
}

describe('SignalFormComponentClass', () => {

  const createInstance = (): TestSignalFormComponent => {
    let instance!: TestSignalFormComponent;
    TestBed.runInInjectionContext(() => {
      instance = new TestSignalFormComponent();
      instance.ngOnInit();
    });
    return instance;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }]
    });
  });

  it('should create an instance', () => {
    expect(createInstance()).toBeTruthy();
  });

  it('should not emit formSubmit and should touch the field when invalid', () => {

    const instance = createInstance();
    const formSubmitSpy = vi.fn();

    instance.formSubmit.subscribe(formSubmitSpy);
    instance.handleSubmit();

    expect(formSubmitSpy).not.toHaveBeenCalled();
    expect((instance as any).form().touched()).toBe(true);

  });

  it('should emit formSubmit with the mapped model when valid', () => {

    const instance = createInstance();
    const formSubmitSpy = vi.fn();

    (instance as any).formModel.set({ name: 'Bruno' });
    instance.formSubmit.subscribe(formSubmitSpy);
    instance.handleSubmit();

    expect(formSubmitSpy).toHaveBeenCalledWith({ name: 'Bruno' });

  });

});
