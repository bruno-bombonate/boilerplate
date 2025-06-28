
# @bruno-bombonate/ngx-forms

A package containing ControlTipComponent and ControlErrorComponent.

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

Using ControlErrorComponent only.

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
    @if (controlErrorMessageIsVisible(form.controls['name'])) {
      <control-error
        [controlErrors]="form.controls['name'].errors">
      </control-error>
    }
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

Using both ControlTipComponent and ControlErrorComponent.

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
    @if (controlErrorMessageIsVisible(form.controls['name']) === false) {
      <control-tip>
        Fill this field with your full name.
      </control-tip>
    } @else {
      <control-error
        [controlErrors]="form.controls['name'].errors">
      </control-error>
    }
  </div>
  <button
    type="submit">
    Submit
  </button>
</form>
```

### Overriding or adding custom errors.

#### app.config.ts

```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxForms, ControlErrors } from '@bruno-bombonate/ngx-forms';

export const controlErrors: ControlErrors = {
  required: () => 'Por favor, informe esse campo.',
  email: () => 'Por favor, informe esse campo no formato: seunome@exemplo.com.br.',
  pattern: () => 'Por favor, informe esse campo no formato correto.',
  min: (error: any) => `Por favor, informe um valor de no mínimo ${error.min}.`,
  max: (error: any) => `Por favor, informe um valor de no máximo ${error.max}.`,
  minlength: (error: any) => `Por favor, informe no mínimo ${error.requiredLength} caracteres.`,
  maxlength: (error: any) => `Por favor, informe no máximo ${error.requiredLength} caracteres.`,
  custom: (error: any) => 'Minha mensagem de erro customizada...'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgxForms(controlErrors)
  ]
};
```
