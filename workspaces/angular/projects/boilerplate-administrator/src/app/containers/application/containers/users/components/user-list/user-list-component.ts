import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '../../../../../../../../../../utils/pipes/status/status-pipe';
import { ListComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-list',
  imports: [
    // directives
    RouterLink,
    // pipes
    StatusPipe
  ],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent extends ListComponentClass { }
