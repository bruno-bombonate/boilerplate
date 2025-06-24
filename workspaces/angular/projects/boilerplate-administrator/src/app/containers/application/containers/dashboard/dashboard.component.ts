import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  public readonly activatedRoute = inject(ActivatedRoute);

}
