import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ProfileViewComponent } from '../../../../../../../../utils/components/profile-view/profile-view.component';
import { PasswordFormComponent } from '../../../../../../../../utils/components/password-form/password-form.component';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { ActivatedRoute } from '@angular/router';
import { ApplicationComponent } from '../../application.component';
import { UserService } from '../../../../../../../../utils/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [
    // components
    ProfileViewComponent,
    PasswordFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly applicationComponent = inject(ApplicationComponent);
  public readonly userService = inject(UserService);

  public readonly formLoading = signal<boolean>(false);
  public readonly formReset = new Subject<void>();

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.patch({ url: 'users/change-password', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.formReset.next();
            this.formLoading.set(false);
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
