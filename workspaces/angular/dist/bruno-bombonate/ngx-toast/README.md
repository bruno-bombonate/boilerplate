
# @bruno-bombonate/ngx-toast

A package with ToastComponent and ToastService, that you can show success, error, warning and info messages.

## Installation

```bash
npm install @bruno-bombonate/ngx-toast
```

### Compatibility table

|@bruno-bombonate/ngx-toast|Angular|
|-|-|
|1.0.0|15.x|
|2.0.0|16.x|
|3.0.0|17.x|
|18.0.0|18.x|
|19.0.0|19.x|
|20.0.1|20.x|
|21.0.0|21.x|

Works with any Angular 21 version (`^21.0.0`), not just the exact minor/patch used to build this package.

## Usage

### app.component.html

```html
<button
  type="button"
  (click)="toastSuccess()">
  Sucess
</button>
<button
  type="button"
  (click)="toastError()">
  Error
</button>
<button
  type="button"
  (click)="toastWarning()">
  Warning
</button>
<button
  type="button"
  (click)="toastInfo()">
  Info
</button>
<toast>
</toast>
```

### app.component.ts

```typescript
import { Component, inject } from '@angular/core';
import { ToastComponent, ToastService } from '@bruno-bombonate/ngx-toast';

@Component({
  selector: 'app-root',
  imports: [
    // components
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  private readonly toastService = inject(ToastService);

  public toastSuccess(): void {
    this.toastService.success('The success message.');
  }

  public toastError(): void {
    this.toastService.error('The error message.');
  }

  public toastWarning(): void {
    this.toastService.warning('The warning message.');
  }

  public toastInfo(): void {
    this.toastService.info('The info message.');
  }

}
```

### styles.scss

```scss
$toast-min-width: 320px;
$toast-background-color: #000000;
$toast-color: #FFFFFF;

$toast-success-background-color: #28A745;
$toast-success-color: #FFFFFF;

$toast-error-background-color: #DC3545;
$toast-error-color: #FFFFFF;

$toast-warning-background-color: #FFC107;
$toast-warning-color: #000000;

$toast-info-background-color: #17A2B8;
$toast-info-color: #FFFFFF;

toast {
  position: fixed;
  z-index: 1;
  bottom: 0px;
  left: 0px;
  display: block;
  min-width: $toast-min-width;
  width: 100%;
  text-align: center;
  padding: 0px 32px 32px 32px;
  transform: translate(0px, 100%);
}

.toast {
  display: inline-flex;
  align-items: center;
  background-color: $toast-background-color;
  line-height: 1;
  text-align: left;
  color: $toast-color;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.10);
}

.toast-success {
  background-color: $toast-success-background-color;
  color: $toast-success-color;
}

.toast-error {
  background-color: $toast-error-background-color;
  color: $toast-error-color;
}

.toast-warning {
  background-color: $toast-warning-background-color;
  color: $toast-warning-color;
}

.toast-info {
  background-color: $toast-info-background-color;
  color: $toast-info-color;
}
```

### Building your own toast UI

You don't have to use `ToastComponent`. `ToastService` also exposes `send$: Observable<Toast>`, emitting every time `success`/`error`/`warning`/`info` is called — subscribe to it to drive your own toast/snackbar UI instead:

```typescript
import { Component, inject } from '@angular/core';
import { ToastService, Toast, ToastType } from '@bruno-bombonate/ngx-toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ /* ... */ })
export class MyOwnToastComponent {

  private readonly toastService = inject(ToastService);

  constructor() {
    this.toastService.send$
      .pipe(takeUntilDestroyed())
      .subscribe((toast: Toast) => {
        // toast.type is a ToastType ('success' | 'error' | 'warning' | 'info')
        // toast.message is the string you passed to the service
      });
  }

}
```
