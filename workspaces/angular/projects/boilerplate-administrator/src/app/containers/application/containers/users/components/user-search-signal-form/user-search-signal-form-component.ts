import { Component, signal } from '@angular/core';
import { FormRoot, FormField, form } from '@angular/forms/signals';
import { SignalFormComponentClass } from '@bruno-bombonate/ngx-classes';

interface UserSearchSignalFormModel {
  userId: string;
  userName: string;
  userEmail: string;
  userStatus: string;
}

@Component({
  selector: 'app-user-search-signal-form',
  imports: [
    // modules
    FormRoot,
    FormField
  ],
  templateUrl: './user-search-signal-form-component.html',
  styleUrl: './user-search-signal-form-component.sass'
})
export class UserSearchSignalFormComponent extends SignalFormComponentClass<UserSearchSignalFormModel> {

  protected override readonly formModel = signal<UserSearchSignalFormModel>({
    userId: '',
    userName: '',
    userEmail: '',
    userStatus: ''
  });

  protected override readonly form = form(this.formModel);

  protected override mapInputValue(value: any): Partial<UserSearchSignalFormModel> {
    const valueMapped: Partial<UserSearchSignalFormModel> = { };
    if (value.userId !== undefined) {
      valueMapped.userId = String(value.userId);
    }
    if (value.userName !== undefined) {
      valueMapped.userName = String(value.userName);
    }
    if (value.userEmail !== undefined) {
      valueMapped.userEmail = String(value.userEmail);
    }
    if (value.userStatus !== undefined) {
      valueMapped.userStatus = String(value.userStatus);
    }
    return valueMapped;
  }

}
