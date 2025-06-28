import { Component, ChangeDetectionStrategy, AfterViewInit, inject, ElementRef, DestroyRef, signal } from '@angular/core';
import { ToastService } from '../../services/toast/toast-service';
import { Toast } from '../../interfaces/toast-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import gsap from 'gsap';

@Component({
  selector: 'toast',
  imports: [],
  templateUrl: './toast-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements AfterViewInit {

  private readonly toastService = inject(ToastService);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  
  private readonly toastAnimationInProgress = signal<boolean>(false);
  private readonly toastAnimationTimeout = signal<undefined | any>(undefined);

  public readonly toastList = signal<Toast[]>([]);

  private toastTimelineShow(): void {

    const toastAnimationInProgress = this.toastAnimationInProgress();
    const toastList = this.toastList();

    if (toastAnimationInProgress === false) {

      this.toastAnimationInProgress.set(true);

      gsap.to(this.elementRef.nativeElement, {
        duration: 0.35,
        y: '0%',
        onComplete: () => {

          this.toastAnimationInProgress.set(false);

          if (toastList.length === 1) {
            this.toastAnimationTimeout.set(
              setTimeout(() => {
                this.toastTimelineHide();
              }, 5000)
            );
          } else {
            this.toastTimelineHide();
          }

        }
      });

    }

  }

  private toastTimelineHide(): void {

    const toastAnimationInProgress = this.toastAnimationInProgress();
    const toastList = this.toastList();
    
    if (toastAnimationInProgress === false) {

      this.toastAnimationInProgress.set(true);

      gsap.to(this.elementRef.nativeElement, {
        clearProps: 'all',
        opacity: 0,
        onComplete: () => {

          this.toastAnimationInProgress.set(false);

          toastList.shift();
          this.toastList.set([...toastList]);

          if (toastList.length !== 0) {
            this.toastTimelineShow();
          }

        }
      });

    }

  }

  public ngAfterViewInit(): void {

    this.toastService.send$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (toast: Toast) => {

          const toastList = this.toastList();
          const toastAnimationTimeout = this.toastAnimationTimeout();

          toastList.push(toast);
          this.toastList.set([...toastList]);

          if (toastList.length === 1) {
            this.toastTimelineShow();
          } else if (toastList.length === 2) {
            clearTimeout(toastAnimationTimeout);
            this.toastTimelineHide();
          } else {
            toastList.splice(1, 1);
            this.toastList.set([...toastList]);
          }

        }
      });

  }

}
