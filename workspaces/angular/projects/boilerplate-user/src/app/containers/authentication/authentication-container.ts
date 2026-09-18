import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-container',
  imports: [
    // directives
    RouterOutlet,
  ],
  templateUrl: './authentication-container.html',
  styleUrl: './authentication-container.sass',
})
export class AuthenticationContainer {}
