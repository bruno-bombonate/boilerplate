import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    // components
    RouterOutlet
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent { }
