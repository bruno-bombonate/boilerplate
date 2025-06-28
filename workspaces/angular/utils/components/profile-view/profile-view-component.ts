import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViewComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-profile-view',
  imports: [
    // pipes
    DatePipe
  ],
  templateUrl: './profile-view-component.html',
  styleUrl: './profile-view-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewComponent extends ViewComponentClass { }
