import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusPipe } from '@app/boilerplate-utils';
import { ViewComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-view',
  imports: [
    // pipes
    DatePipe,
    StatusPipe,
  ],
  templateUrl: './user-view-component.html',
  styleUrl: './user-view-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewComponent extends ViewComponentClass {}
