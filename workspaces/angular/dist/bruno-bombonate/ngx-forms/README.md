
# @bruno-bombonate/ngx-forms

A package containing `ControlTipComponent` and `ControlErrorComponent`, with `FormsService`/`provideNgxForms` to customize error messages and error-visibility rules app-wide.

## Installation

```bash
npm install @bruno-bombonate/ngx-forms
```

### Compatibility table

|@bruno-bombonate/ngx-forms|Angular|
|-|-|
|3.0.3|15.x|
|4.0.0|16.x|
|5.0.0|17.x|
|18.0.0|18.x|
|19.0.0|19.x|
|20.0.0|20.x|
|21.0.0|21.x|

Works with any Angular 21 version (`^21.0.0`), not just the exact minor/patch used to build this package.

## Usage

### Import.

#### user-form.component.ts

```typescript
import { Component } from '@angular/core';
import { ControlTipComponent, ControlErrorComponent } from '@bruno-bombonate/ngx-forms';

@Component({
  selector: 'app-user-form',
  imports: [
    // components
    ControlTipComponent,
    ControlErrorComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.sass'
})
export class UserFormComponent { }

```

#### user-form.component.html

Using ControlTipComponent only.

```html
<form [formGroup]="form" (ngSubmit)="handleNgSubmit()">
  <div>
    <label
      for="name">
      Name
    </label>
    <input
      type="text"
      id="name"
      formControlName="name">
    <control-tip>
      Fill this field with your full name.
    </control-tip>
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

Using ControlErrorComponent only. `ControlErrorComponent` receives the whole `AbstractControl` (not just its `errors`) and decides on its own whether the message should be visible — by default, when the control has errors and is `touched` or `dirty`.

```html
<form [formGroup]="form" (ngSubmit)="handleNgSubmit()">
  <div>
    <label
      for="name">
      Name
    </label>
    <input
      type="text"
      id="name"
      formControlName="name">
    <control-error
      [control]="form.controls['name']">
    </control-error>
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

Using both ControlTipComponent and ControlErrorComponent. If you need the same visibility rule elsewhere in your template (for example, to hide a `ControlTipComponent` while an error is shown), inject `FormsService` and call `controlErrorVisible(control)` — it's the same predicate `ControlErrorComponent` uses internally (the default one, or the one you provided via `provideNgxForms`, see below).

```typescript
import { Component, inject } from '@angular/core';
import { FormsService } from '@bruno-bombonate/ngx-forms';

@Component({
  selector: 'app-user-form',
  // ...
})
export class UserFormComponent {
  protected readonly formsService = inject(FormsService);
}
```

```html
<form [formGroup]="form" (ngSubmit)="handleNgSubmit()">
  <div>
    <label
      for="name">
      Name
    </label>
    <input
      type="text"
      id="name"
      formControlName="name">
    @if (formsService.controlErrorVisible(form.controls['name']) === false) {
      <control-tip>
        Fill this field with your full name.
      </control-tip>
    } @else {
      <control-error
        [control]="form.controls['name']">
      </control-error>
    }
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

### Overriding or adding custom errors, or the error visibility rule.

Out of the box, `ControlErrorComponent` already has a message for every one of Angular's built-in validators: `required`, `requiredTrue`, `email`, `pattern`, `min`, `max`, `minlength`, `maxlength`. You only need `provideNgxForms` if you want to change one of those messages, translate them, or add a message for your own custom validator's error key (like `custom` below) — `controlErrors` is **merged** into the built-in defaults, not a replacement for them, so you only need to list the keys you're adding or overriding, not the full set.

`provideNgxForms` takes an options object — both `controlErrors` and `controlErrorVisible` are optional, so you can pass either one, both, or neither.

#### app.config.ts

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxForms, ControlErrors, ControlErrorVisible } from '@bruno-bombonate/ngx-forms';

export const controlErrors: ControlErrors = {
  // overriding a built-in message
  required: () => 'Por favor, informe esse campo.',
  // adding a message for your own custom validator's error key
  custom: (error: any) => 'Minha mensagem de erro customizada...'
};

// Default rule is: control.errors !== null && (control.touched || control.dirty).
// Override it here to change when every <control-error> in this app shows its message.
export const controlErrorVisible: ControlErrorVisible = (control) => control.errors !== null;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgxForms({ controlErrors, controlErrorVisible })
  ]
};
```

If a control has an error whose key isn't in the built-in list and wasn't added through `controlErrors`, `ControlErrorComponent` throws — that's on purpose, so a forgotten custom-validator message fails loudly in development instead of silently showing nothing.
