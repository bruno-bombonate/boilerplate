import { Component, inject, signal } from '@angular/core';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { SignInSignalFormComponent, HttpService, UserService } from '@app/boilerplate-utils';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { resetPasswordContainerRoutes } from '../reset-password/reset-password-routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-in-container',
  imports: [
    // components
    SignInSignalFormComponent,
    // directives
    RouterLink,
  ],
  templateUrl: './sign-in-container.html',
  styleUrl: './sign-in-container.sass',
})
export class SignInContainer extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly formLoading = signal<boolean>(false);

  public readonly resetPasswordContainerRoutes = resetPasswordContainerRoutes;

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'administrators/sign-in', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.userService.userToken = response.data.accessToken;
            this.toastService.success(response.message);
            this.router.navigate(['/']);
          },
          error: (response: any) => {
            this.toastService.error(response.error.message);
            this.formLoading.set(false);
          },
        });
    }
  }

}
