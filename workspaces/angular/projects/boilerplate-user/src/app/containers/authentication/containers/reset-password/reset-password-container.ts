import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ResetPasswordRequestFormComponent } from '../../../../../../../../utils/components/reset-password-request-form/reset-password-request-form-component';
import { ResetPasswordFormComponent } from '../../../../../../../../utils/components/reset-password-form/reset-password-form-component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../utils/services/http/http-service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { signInContainerRoutes } from '../sign-in/sign-in-container.routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password-container',
  imports: [
    // components
    ResetPasswordRequestFormComponent,
    ResetPasswordFormComponent,
    // directives
    RouterLink
  ],
  templateUrl: './reset-password-container.html',
  styleUrl: './reset-password-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordContainer extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly token = signal<null | string>(this.activatedRoute.snapshot.queryParamMap.get('token'));

  public readonly formLoading = signal<boolean>(false);
  
  public readonly signInContainerRoutes = signInContainerRoutes;

  public handleResetPasswordRequestFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'users/reset-password', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.router.navigate(['/sign-in']);
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

  public handleResetPasswordFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.patch({ url: `users/reset-password/${this.token}`, body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.router.navigate(['/sign-in']);
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
