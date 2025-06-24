import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AdministratorFormComponent } from '../../components/administrator-form/administrator-form.component';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-administrators-add',
  imports: [
    // components
    AdministratorFormComponent
  ],
  templateUrl: './administrators-add.component.html',
  styleUrl: './administrators-add.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsAddComponent extends DestroyRefClass {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly formLoading = signal<boolean>(false);

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.post({ url: 'administrators', body: value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.toastService.success(response.message);
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          },
          error: (response: any) => {
            this.toastService.error(response.message);
            this.formLoading.set(false);
          }
        });
    }
  }

}
