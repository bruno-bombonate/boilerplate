import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { UserViewComponent } from '../../components/user-view/user-view-component';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http-service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-details-container',
  imports: [
    // components
    UserViewComponent
  ],
  templateUrl: './users-details-container.html',
  styleUrl: './users-details-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailsContainer extends DestroyRefClass implements OnInit {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly user = signal<undefined | any>(undefined);

  public ngOnInit(): void {

    const userId = this.activatedRoute.snapshot.paramMap.get('userId');

    this.httpService.get({ url: `users/${userId}` })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          this.user.set(response.data);
        },
        error: (response: any) => {
          this.toastService.error(response.message);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }
      });

  }

}
