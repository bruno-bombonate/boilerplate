import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { SignInFormComponent } from '../../../../../../../../utils/components/sign-in-form/sign-in-form-component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../utils/services/http/http-service';
import { UserService } from '../../../../../../../../utils/services/user/user-service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { signUpContainerRoutes } from '../sign-up/sign-up-container.routes';
import { resetPasswordContainerRoutes } from '../reset-password/reset-password-container.routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-in-container',
  imports: [
    // components
    SignInFormComponent,
    // directives
    RouterLink
  ],
  templateUrl: './sign-in-container.html',
  styleUrl: './sign-in-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInContainer extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly formLoading = signal<boolean>(false);

  public readonly signUpContainerRoutes = signUpContainerRoutes;
  public readonly resetPasswordContainerRoutes = resetPasswordContainerRoutes;

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'users/sign-in', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.userService.userToken = response.data.accessToken;
            this.toastService.success(response.message);
            this.router.navigate(['/']);
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
