import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-container',
  imports: [
    // components
    RouterOutlet
  ],
  templateUrl: './authentication-container.html',
  styleUrl: './authentication-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationContainer {

}
