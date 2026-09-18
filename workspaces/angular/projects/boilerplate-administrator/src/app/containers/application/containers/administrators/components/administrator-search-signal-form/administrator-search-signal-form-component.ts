import { Component, signal } from '@angular/core';
import { FormRoot, FormField, form } from '@angular/forms/signals';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface AdministratorSearchSignalFormModel {
  administratorId: string;
  administratorName: string;
  administratorEmail: string;
  administratorStatus: string;
}

@Component({
  selector: 'app-administrator-search-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField
  ],
  templateUrl: './administrator-search-signal-form-component.html',
  styleUrl: './administrator-search-signal-form-component.sass'
})
export class AdministratorSearchSignalFormComponent extends SignalFormComponentClass<AdministratorSearchSignalFormModel> {

  protected override readonly formModel = signal<AdministratorSearchSignalFormModel>({
    administratorId: '',
    administratorName: '',
    administratorEmail: '',
    administratorStatus: ''
  });

  protected override readonly form = form(this.formModel);

  protected override mapInputValue(value: any): Partial<AdministratorSearchSignalFormModel> {
    const valueMapped: Partial<AdministratorSearchSignalFormModel> = { };
    if (value.administratorId !== undefined) {
      valueMapped.administratorId = String(value.administratorId);
    }
    if (value.administratorName !== undefined) {
      valueMapped.administratorName = String(value.administratorName);
    }
    if (value.administratorEmail !== undefined) {
      valueMapped.administratorEmail = String(value.administratorEmail);
    }
    if (value.administratorStatus !== undefined) {
      valueMapped.administratorStatus = String(value.administratorStatus);
    }
    return valueMapped;
  }

}
