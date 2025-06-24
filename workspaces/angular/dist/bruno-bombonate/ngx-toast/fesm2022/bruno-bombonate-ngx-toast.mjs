import * as i0 from '@angular/core';
import { Injectable, inject, ElementRef, DestroyRef, signal, ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import gsap from 'gsap';

var ToastType;
(function (ToastType) {
    ToastType["Success"] = "success";
    ToastType["Error"] = "error";
})(ToastType || (ToastType = {}));

class ToastService {
    _send = new Subject();
    get send$() {
        return this._send.asObservable();
    }
    set send(toast) {
        this._send.next(toast);
    }
    success(message) {
        this.send = { type: ToastType.Success, message };
    }
    error(message) {
        this.send = { type: ToastType.Error, message };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ToastComponent {
    toastService = inject(ToastService);
    elementRef = inject(ElementRef);
    destroyRef = inject(DestroyRef);
    toastAnimationInProgress = signal(false);
    toastAnimationTimeout = signal(undefined);
    toastList = signal([]);
    toastTimelineShow() {
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
                        this.toastAnimationTimeout.set(setTimeout(() => {
                            this.toastTimelineHide();
                        }, 5000));
                    }
                    else {
                        this.toastTimelineHide();
                    }
                }
            });
        }
    }
    toastTimelineHide() {
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
    ngAfterViewInit() {
        this.toastService.send$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (toast) => {
                const toastList = this.toastList();
                const toastAnimationTimeout = this.toastAnimationTimeout();
                toastList.push(toast);
                this.toastList.set([...toastList]);
                if (toastList.length === 1) {
                    this.toastTimelineShow();
                }
                else if (toastList.length === 2) {
                    clearTimeout(toastAnimationTimeout);
                    this.toastTimelineHide();
                }
                else {
                    toastList.splice(1, 1);
                    this.toastList.set([...toastList]);
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.11", type: ToastComponent, isStandalone: true, selector: "toast", ngImport: i0, template: "@if (toastList().length !== 0) {\r\n  <div\r\n    class=\"toast\"\r\n    [class.toast-error]=\"toastList()[0].type === 'error'\"\r\n    [class.toast-success]=\"toastList()[0].type === 'success'\">\r\n    {{ toastList()[0].message }}\r\n  </div>\r\n}\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'toast', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (toastList().length !== 0) {\r\n  <div\r\n    class=\"toast\"\r\n    [class.toast-error]=\"toastList()[0].type === 'error'\"\r\n    [class.toast-success]=\"toastList()[0].type === 'success'\">\r\n    {{ toastList()[0].message }}\r\n  </div>\r\n}\r\n" }]
        }] });

/*
 * Public API Surface of ngx-toast
 */
// components

/**
 * Generated bundle index. Do not edit.
 */

export { ToastComponent, ToastService, ToastType };
//# sourceMappingURL=bruno-bombonate-ngx-toast.mjs.map
