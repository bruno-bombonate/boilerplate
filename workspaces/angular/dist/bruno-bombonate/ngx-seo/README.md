
# @bruno-bombonate/ngx-seo

A package with SeoService, that you can set title and meta description for routes in Angular apps.

## Installation

```bash
npm install @bruno-bombonate/ngx-seo
```

### Compatibility table

|@bruno-bombonate/ngx-seo|Angular|
|-|-|
|1.1.0|15.x|
|2.0.0|16.x|
|3.0.0|17.x|
|18.0.0|18.x|
|19.0.0|19.x|
|20.0.0|20.x|

## Usage

### app.component.ts

Start SeoService calling seoService.init(appName) at AppComponent's ngOnInit function.

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@bruno-bombonate/ngx-seo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private readonly seoService = inject(SeoService);

  public ngOnInit(): void {
    this.seoService.init('App');
  }

}
```

### app-routing.module.ts

Define route's title and meta description at data object.

```typescript
import { Routes } from '@angular/router';
import { PageComponent } from './containers/page/page.component';

export const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    data: {
      title: 'Title',
      meta: {
        description: 'Description.'
      }
    }
  }
];
```

