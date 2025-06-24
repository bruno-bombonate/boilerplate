import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  imports: [
    // pipes
    DatePipe
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewComponent {

  public readonly item = input.required<any>();

}
