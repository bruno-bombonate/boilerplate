
# @bruno-bombonate/ngx-forms

A package containing `ControlTipComponent` and `ControlErrorComponent`, with `FormsService`/`provideNgxForms` to customize error messages and error-visibility rules app-wide. `ControlErrorComponent` works with both Reactive Forms (`AbstractControl`) and Signal Forms (`FieldTree`, `@angular/forms/signals`) — pass either one to the same `[control]` input.

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
|22.0.0|22.x|

Works with any Angular 22 version (`^22.0.0`), not just the exact minor/patch used to build this package.

## Setup

Call `provideNgxForms()` in your `app.config.ts`, even with no arguments — besides letting you [customize error messages](#overriding-or-adding-custom-errors-or-the-error-visibility-rule), it registers the `ng-valid`/`ng-invalid`/`ng-touched`/`ng-untouched`/`ng-dirty`/`ng-pristine` CSS classes for Signal Forms fields. Reactive Forms adds these classes on its own; Signal Forms doesn't unless you opt in, and `SignalFormComponentClass` (from `@bruno-bombonate/ngx-classes`) relies on `.ng-invalid` to scroll to the first invalid field on submit.

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxForms } from '@bruno-bombonate/ngx-forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgxForms()
  ]
};
```

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

Using ControlErrorComponent only. `ControlErrorComponent` receives the whole control (not just its errors) and decides on its own whether the message should be visible — by default, when the control has errors and is touched or dirty. Pass it a Reactive Forms `AbstractControl`:

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

...or a Signal Forms field — same `[control]` input, `ControlErrorComponent` detects which kind it got at runtime:

```html
<form [formRoot]="form" (submit)="handleSubmit()">
  <div>
    <label
      for="name">
      Name
    </label>
    <input
      id="name"
      [formField]="form.name">
    <control-error
      [control]="form.name">
    </control-error>
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

`[formRoot]` and `[formField]` are the directives Signal Forms itself provides — import `FormRoot`/`FormField` from `@angular/forms/signals` into your component's `imports` array alongside `ControlErrorComponent`.

Using both ControlTipComponent and ControlErrorComponent. If you need the same visibility rule elsewhere in your template (for example, to hide a `ControlTipComponent` while an error is shown), inject `FormsService` and call `controlErrorVisible(control)` for a Reactive control or `fieldErrorVisible(field())` for a Signal Forms field — these are the same predicates `ControlErrorComponent` uses internally (the default ones, or the ones you provided via `provideNgxForms`, see below).

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

Out of the box, `ControlErrorComponent` already has a message for every one of Angular's built-in validators, for both forms:

- **Reactive Forms**: `required`, `requiredTrue`, `email`, `pattern`, `min`, `max`, `minlength`, `maxlength`.
- **Signal Forms**: `required`, `email`, `pattern`, `min`, `max`, `minLength`, `maxLength` (note the casing — Signal Forms' own validators use `minLength`/`maxLength`, not `minlength`/`maxlength`, and there's no separate `requiredTrue` kind).

You only need `provideNgxForms` if you want to change one of those messages, translate them, or add a message for your own custom validator's error key (like `custom` below) — `controlErrors`/`fieldErrors` are **merged** into their respective built-in defaults, not a replacement for them, so you only need to list the keys you're adding or overriding, not the full set.

`provideNgxForms` takes an optional options object — `controlErrors`, `controlErrorVisible`, `fieldErrors` and `fieldErrorVisible` are all optional, so you can pass any combination, or call it with no arguments at all (see [Setup](#setup) above).

#### app.config.ts

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxForms, ControlErrors, ControlErrorVisible, FieldErrors, FieldErrorVisible } from '@bruno-bombonate/ngx-forms';

export const controlErrors: ControlErrors = {
  // overriding a built-in message
  required: () => 'Please fill this field.',
  // adding a message for your own custom validator's error key
  custom: (error: any) => 'My custom error message...'
};

// Default rule is: control.errors !== null && (control.touched || control.dirty).
// Override it here to change when every <control-error> bound to a Reactive control shows its message.
export const controlErrorVisible: ControlErrorVisible = (control) => control.errors !== null;

export const fieldErrors: FieldErrors = {
  required: () => 'Please fill this field.'
};

// Default rule is: field.errors().length > 0 && (field.touched() || field.dirty()).
// Override it here to change when every <control-error> bound to a Signal Forms field shows its message.
export const fieldErrorVisible: FieldErrorVisible = (field) => field.errors().length > 0;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgxForms({ controlErrors, controlErrorVisible, fieldErrors, fieldErrorVisible })
  ]
};
```

If a control (or field) has an error whose key isn't in the built-in list and wasn't added through `controlErrors`/`fieldErrors`, `ControlErrorComponent` throws — that's on purpose, so a forgotten custom-validator message fails loudly in development instead of silently showing nothing.
