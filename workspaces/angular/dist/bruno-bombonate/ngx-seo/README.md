
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
|21.0.0|21.x|
|22.0.0|22.x|

Works with any Angular 22 version (`^22.0.0`), not just the exact minor/patch used to build this package.

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

On every navigation, `SeoService` walks down to the deepest activated child route (on the `primary` outlet) and reads its `data`. The document title becomes `'${appName}: ${data.title}'` when `data.title` is set, or just `appName` on its own when the route doesn't set one — so `init(appName)` alone already gives every route a sensible title, even before you add `data.title` anywhere. `data.meta.description`, when present, is applied as the page's `<meta name="description">`.

### Setting title/meta outside of route data

`setTitle(title: string): void` and `setMeta(meta: any): void` are also public — call them directly whenever you need to set the title or a meta tag imperatively (for a title built from data loaded after navigation, for example), instead of going through route `data`:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@bruno-bombonate/ngx-seo';
import { ActivatedRoute } from '@angular/router';

@Component({ /* ... */ })
export class PageComponent implements OnInit {

  private readonly seoService = inject(SeoService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    // e.g. after loading the record shown on this page
    this.seoService.setTitle(`App: ${this.record.name}`);
    this.seoService.setMeta({ name: 'description', content: this.record.summary });
  }

}
```

`setMeta` forwards `meta` as-is to Angular's own [`Meta.updateTag`](https://angular.dev/api/platform-browser/Meta#updateTag), so it accepts the same selectors as that API (`name`, `property`, etc.), not just `description`.
