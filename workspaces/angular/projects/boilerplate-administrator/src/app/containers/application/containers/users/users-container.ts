import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-container',
  imports: [
    // components
    RouterOutlet
  ],
  templateUrl: './users-container.html',
  styleUrl: './users-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainer { }
