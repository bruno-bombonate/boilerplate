import * as i0 from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

declare enum ToastType {
    Success = "success",
    Error = "error"
}
interface Toast {
    type: ToastType;
    message: string;
}

declare class ToastComponent implements AfterViewInit {
    private readonly toastService;
    private readonly elementRef;
    private readonly destroyRef;
    private readonly toastAnimationInProgress;
    private readonly toastAnimationTimeout;
    readonly toastList: i0.WritableSignal<Toast[]>;
    private toastTimelineShow;
    private toastTimelineHide;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastComponent, "toast", never, {}, {}, never, never, true, never>;
}

declare class ToastService {
    private readonly _send;
    get send$(): Observable<Toast>;
    private set send(value);
    success(message: string): void;
    error(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastService>;
}

export { ToastComponent, ToastService, ToastType };
export type { Toast };
