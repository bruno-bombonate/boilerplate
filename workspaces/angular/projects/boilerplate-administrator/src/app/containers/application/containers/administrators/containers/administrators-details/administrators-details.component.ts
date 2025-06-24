import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { AdministratorFormComponent } from '../../components/administrator-form/administrator-form.component';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { HttpService } from '../../../../../../utils/services/http/http.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-administrators-details',
  imports: [
    // components
    AdministratorFormComponent
  ],
  templateUrl: './administrators-details.component.html',
  styleUrl: './administrators-details.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsDetailsComponent extends DestroyRefClass implements OnInit {

  private readonly httpService = inject(HttpService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly administrator = signal<undefined | any>(undefined);

  public readonly formLoading = signal<boolean>(false);

  public ngOnInit(): void {

    const administratorId = this.activatedRoute.snapshot.paramMap.get('administratorId');

    this.httpService.get({ url: `administrators/${administratorId}` })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          this.administrator.set(response.data);
        },
        error: (response: any) => {
          this.toastService.error(response.message);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }
      });

  }

  public handleFormSubmit(value: any): void {
    if (this.formLoading() === false) {
      this.formLoading.set(true);
      this.httpService.patch({ url: `administrators/${this.administrator().id}`, body: value })
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
        })
    }
  }

}
