import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

class SeoService {
    title = inject(Title);
    meta = inject(Meta);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    appName = '';
    setTitle(title) {
        this.title.setTitle(title);
    }
    setMeta(meta) {
        this.meta.updateTag(meta);
    }
    listenForRouteChanges() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute), map((activatedRoute) => {
            while (activatedRoute.firstChild) {
                activatedRoute = activatedRoute.firstChild;
            }
            return activatedRoute;
        }), filter((activatedRoute) => activatedRoute.outlet === 'primary'), mergeMap((activatedRoute) => activatedRoute.data))
            .subscribe((data) => {
            let title = this.appName;
            if (data !== undefined) {
                if (data.title !== undefined) {
                    title = `${this.appName}: ${data.title}`;
                }
                if (data.meta !== undefined) {
                    if (data.meta.description !== undefined) {
                        this.setMeta({ name: 'description', content: data.meta.description });
                    }
                }
            }
            this.setTitle(title);
        });
    }
    init(appName) {
        this.appName = appName;
        this.listenForRouteChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: SeoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: SeoService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.11", ngImport: i0, type: SeoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/*
 * Public API Surface of ngx-seo
 */
// services

/**
 * Generated bundle index. Do not edit.
 */

export { SeoService };
//# sourceMappingURL=bruno-bombonate-ngx-seo.mjs.map
