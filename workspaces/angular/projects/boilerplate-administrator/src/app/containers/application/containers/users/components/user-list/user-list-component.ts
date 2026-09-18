import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '@app/boilerplate-utils';
import { ListComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-user-list',
  imports: [
    // directives
    RouterLink,
    // pipes
    StatusPipe,
  ],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.sass',
})
export class UserListComponent extends ListComponentClass {}
