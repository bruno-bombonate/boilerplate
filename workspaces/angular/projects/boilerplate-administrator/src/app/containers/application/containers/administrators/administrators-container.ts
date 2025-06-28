import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administrators-container',
  imports: [
    // components
    RouterOutlet
  ],
  templateUrl: './administrators-container.html',
  styleUrl: './administrators-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsContainer { }
