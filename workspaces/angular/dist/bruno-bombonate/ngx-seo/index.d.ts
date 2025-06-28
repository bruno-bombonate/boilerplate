import * as i0 from '@angular/core';

declare class SeoService {
    private readonly title;
    private readonly meta;
    private readonly router;
    private readonly activatedRoute;
    appName: string;
    setTitle(title: string): void;
    setMeta(meta: any): void;
    private listenForRouteChanges;
    init(appName: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SeoService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SeoService>;
}

export { SeoService };
