import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form-component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../utils/services/http/http-service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { signInContainerRoutes } from '../sign-in/sign-in-container.routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up-container',
  imports: [
    // components
    SignUpFormComponent,
    // directives
    RouterLink
  ],
  templateUrl: './sign-up-container.html',
  styleUrl: './sign-up-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
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
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
