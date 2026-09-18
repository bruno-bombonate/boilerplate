import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-container',
  imports: [
    // directives
    RouterOutlet,
  ],
  templateUrl: './users-container.html',
  styleUrl: './users-container.sass',
})
export class UsersContainer {}
