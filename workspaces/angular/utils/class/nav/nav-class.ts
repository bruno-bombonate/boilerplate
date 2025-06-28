import { Directive, AfterViewInit, inject, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { DestroyRefClass } from '@bruno-bombonate/ngx-classes';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export class NavClass extends DestroyRefClass implements AfterViewInit {

  private readonly platformId = inject(PLATFORM_ID);

  private readonly navElementRef = viewChild<undefined | ElementRef<HTMLElement>>('nav');
  private navTimeline: undefined | any = undefined;

  protected initNav(): void {

    if (isPlatformBrowser(this.platformId) === true) {

      const navElementRef = this.navElementRef();

      if (navElementRef !== undefined) {

        const navElementRefNativeElement = navElementRef.nativeElement;

        this.navTimeline = gsap.timeline({
          paused: true,
          onReverseComplete: () => {
            gsap.set(navElementRefNativeElement, { clearProps: 'all' });
            gsap.set(document.body, { clearProps: 'all' });
          }
        })
          .set(document.body, { overflow: 'hidden' })
          .set(navElementRefNativeElement, { display: 'flex' })
          .to(navElementRefNativeElement, { duration: 0.5, opacity: 1 });

        fromEvent(window, 'resize')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.navClose());

      }

    }

  }

  public ngAfterViewInit(): void {
    this.initNav();
  }
  
  public navOpen(): void {
    this.navTimeline.play();
  }

  public navClose(): void {
    this.navTimeline.reverse();
  }

}
