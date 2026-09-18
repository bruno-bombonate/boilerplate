import { Service } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toast, ToastType } from '../../interfaces/toast-interface';

@Service()
export class ToastService {

  private readonly _send: Subject<Toast> = new Subject();

  public get send$(): Observable<Toast> {
    return this._send.asObservable();
  }

  private set send(toast: Toast) {
    this._send.next(toast);
  }

  public success(message: string): void {
    this.send = { type: ToastType.Success, message };
  }

  public error(message: string): void {
    this.send = { type: ToastType.Error, message };
  }

  public warning(message: string): void {
    this.send = { type: ToastType.Warning, message };
  }

  public info(message: string): void {
    this.send = { type: ToastType.Info, message };
  }

}
