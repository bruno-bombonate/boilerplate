import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ProfileViewComponent, PasswordFormComponent, HttpService, UserService } from '@app/boilerplate-utils';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { ActivatedRoute } from '@angular/router';
import { ApplicationContainer } from '../../application-container';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-container',
  imports: [
    // components
    ProfileViewComponent,
    PasswordFormComponent,
  ],
  templateUrl: './profile-container.html',
  styleUrl: './profile-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainer extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly applicationContainer = inject(ApplicationContainer);
  public readonly userService = inject(UserService);

  public readonly formLoading = signal<boolean>(false);
  public readonly formReset = new Subject<void>();

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.patch({ url: 'administrators/change-password', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.formReset.next();
            this.formLoading.set(false);
          },
          error: (response: any) => {
            this.toastService.error(response.error.message);
            this.formLoading.set(false);
          },
        });
    }
  }

}
