import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  imports: [],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.sass',
})
export class DashboardContainer {

  public readonly activatedRoute = inject(ActivatedRoute);

}
