import { Component, inject, signal } from '@angular/core';
import { SignUpSignalFormComponent } from './components/sign-up-signal-form/sign-up-signal-form-component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '@app/boilerplate-utils';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { signInContainerRoutes } from '../sign-in/sign-in-routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up-container',
  imports: [
    // components
    SignUpSignalFormComponent,
    // directives
    RouterLink,
  ],
  templateUrl: './sign-up-container.html',
  styleUrl: './sign-up-container.sass',
})
export class SignUpContainer extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly formLoading = signal<boolean>(false);

  public readonly signInContainerRoutes = signInContainerRoutes;

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'users/sign-up', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.router.navigate(['/sign-in']);
          },
          error: (response: any) => {
            this.toastService.error(response.error.message);
            this.formLoading.set(false);
          },
        });
    }
  }

}
