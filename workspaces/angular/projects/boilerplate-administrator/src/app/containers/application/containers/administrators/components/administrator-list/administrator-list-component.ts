import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '../../../../../../../../../../utils/pipes/status/status-pipe';
import { ListComponentClass } from '@bruno-bombonate/ngx-classes';

@Component({
  selector: 'app-administrator-list',
  imports: [
    // directives
    RouterLink,
    // pipes
    StatusPipe
  ],
  templateUrl: './administrator-list-component.html',
  styleUrl: './administrator-list-component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorListComponent extends ListComponentClass { }
