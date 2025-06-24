import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administrators',
  imports: [
    // components
    RouterOutlet
  ],
  templateUrl: './administrators.component.html',
  styleUrl: './administrators.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsComponent { }
