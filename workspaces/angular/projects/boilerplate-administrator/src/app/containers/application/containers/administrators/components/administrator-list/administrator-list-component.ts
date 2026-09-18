import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '@app/boilerplate-utils';
import { ListComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-administrator-list',
  imports: [
    // directives
    RouterLink,
    // pipes
    StatusPipe,
  ],
  templateUrl: './administrator-list-component.html',
  styleUrl: './administrator-list-component.sass',
})
export class AdministratorListComponent extends ListComponentClass {}
