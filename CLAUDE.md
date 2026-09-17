# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is a personal full-stack boilerplate with two independent npm workspaces under `workspaces/`, each with its own `package.json`/lockfile (no root-level package manager ties them together — always `cd` into the relevant workspace before running npm/ng/nest commands):

- **`workspaces/angular`** — Angular 21 multi-project workspace (zoneless by default, SSR mandatory for both apps).
- **`workspaces/nest`** — NestJS 9 monorepo backend.

Both workspaces mirror the same two-app shape: a **user-facing app** and an **administrator-facing app**, each with its own API/site, auth, and port. `workspaces/angular` was migrated from an Angular 20 workspace; that migration's decisions and rationale (naming conventions, zoneless/SSR findings, library extraction) are logged in `docs/plano-migracao-angular-21.md` as a living history — consult it before assuming an odd-looking pattern here is unintentional.

## Commands

### Angular (`workspaces/angular`)

```bash
npm run boilerplate-user:start:local          # serve boilerplate-user on :5011
npm run boilerplate-administrator:start:local # serve boilerplate-administrator on :6011
npm run boilerplate:start:local               # serve both concurrently
ng build <project>                            # build a specific project (see angular.json for project names)
ng test <project>                             # run Vitest unit tests for a project (not Karma)
```

Projects registered in `angular.json`: `boilerplate-user`, `boilerplate-administrator`, `boilerplate-utils` (internal, unpublished — see below), and five publishable libraries under `@bruno-bombonate/*` (`ngx-classes`, `ngx-toast`, `ngx-authentication`, `ngx-seo`, `ngx-forms`). The `ngx-*` libraries live in `projects/bruno-bombonate/*` and are published to npm independently — bumping their version in `package.json` is a real release, not just an internal version bump; their `README.md` is the source of truth for their full public API and must stay in sync with it.

`AGENTS.md` in this workspace encodes house style for Angular code and should be followed for any work here: standalone components (no explicit `standalone: true`, it's the default), signals for state (`input()`/`output()`, `computed()`, no `mutate` — use `update`/`set`), `inject()` over constructor injection, native control flow (`@if`/`@for`/`@switch`), `class`/`style` bindings instead of `ngClass`/`ngStyle`, `ChangeDetectionStrategy.OnPush` (kept as house style even though zoneless no longer requires it), reactive forms, `NgOptimizedImage`, and no `@HostBinding`/`@HostListener` (use the `host` object instead). Code must pass AXE checks and meet WCAG AA. `provideZonelessChangeDetection()` is **not** needed in `app.config.ts` — zoneless is automatic in v21 when `zone.js` is absent from polyfills.

### Nest (`workspaces/nest`)

```bash
npm run boilerplate-user:start:local          # nest start boilerplate-user --watch (APP_ENV=local)
npm run boilerplate-administrator:start:local # nest start boilerplate-administrator --watch
npm run boilerplate:start:local               # both concurrently
npm run build                                 # nest build
npm run lint                                  # eslint --fix over src,apps,libs,test
npm test                                      # jest unit tests
npm run test:watch
npm run test:cov
npm run test:e2e                              # jest -c apps/nest/test/jest-e2e.json
```

To run a single test file: `npx jest path/to/file.spec.ts`.

Environment variables are loaded via `custom-env` keyed on `APP_ENV` (e.g. `APP_ENV=local` loads `.env.local` if present, falling back to `.env`), invoked at the top of each app's `main.ts`. Required variable names are documented by the keys already present in `.env` (DB connection, per-app JWT secret/expiry/port/URLs, OneSignal keys, SMTP creds) — copy that file's keys, not its values.

## Architecture

### Nest backend (`workspaces/nest`)

Nest CLI monorepo mode (`nest-cli.json`, `"monorepo": true`) with two deployable **apps** and two shared **libs**:

- `apps/boilerplate-user` and `apps/boilerplate-administrator` — separate Nest applications, each with its own module, main.ts (own port from env, own Swagger doc at `/swagger`), JWT strategy + guard under `src/utils/strategies|guards/jwt`, and feature modules under `src/modules`. The two apps are structurally parallel but independently deployed — most changes to auth/guards need to be made in both if they should apply to both apps.
- `libs/boilerplate-database` — shared TypeORM module: entities, subscribers, and per-domain modules under `src/modules/{users,administrators}`. Imported via the path alias `@app/boilerplate-database` (mapped in `tsconfig.json`). Entities are registered centrally in `config/configuration.ts`, which builds the TypeORM connection config — new entities must be added there.
- `libs/boilerplate-email` — shared mailer module (`@nestjs-modules/mailer` + EJS templates under `src/templates`), aliased as `@app/boilerplate-email`.

Both apps use `passport-jwt` with per-app secret/expiry configured through env vars (`APP_BOILERPLATE_{USER,ADMINISTRATOR}_API_SECRET_KEY` / `_EXPIRES_IN`), so a user token and an administrator token are not interchangeable.

### Angular frontend (`workspaces/angular`)

Angular CLI multi-project workspace (`angular.json`) with SSR enabled (`@angular/ssr`, `server.ts`, `main.server.ts` per project) for both `boilerplate-user` and `boilerplate-administrator`. Each app follows the same layout under `src/app/containers`:

- `authentication/` and `application/` — the two top-level route containers, split along the same auth/app boundary the Nest guards enforce, each with its own nested `containers/` for child routes.
- Component naming: **`*-container`** for route-linked smart components (always generated via `ng generate component <name> --path=.../containers/<base-name> --flat`, folder = base name without the suffix, file = base name + `-container`), **`*-component`** for dumb/presentational components with a shape qualifier (`-form`, `-list`, `-search-form`, `-view`). Route files are plain `<base-name>-routes.ts` next to the container (no CLI schematic for these — they're data, not a class). `ng generate guard/pipe/interceptor/resolver` auto-append their own suffix — never include it in the name passed to those four schematics, unlike `component`/`service`/`directive`/`class`.

Shared, independently-versioned libraries live in `projects/bruno-bombonate/*` and are consumed both inside this workspace and published externally as `@bruno-bombonate/ngx-*` packages — treat changes there as public API changes, not internal refactors.

Everything shared between the two apps that ISN'T meant for external publishing (no more relative-import `utils/` folder) lives in `projects/boilerplate-utils` (`@app/boilerplate-utils`, path-aliased in `tsconfig.json`, unpublished): `UserService`/`HttpService`/`LoadingService`, the `jwtInterceptor`/`createErrorInterceptor`/`loadingInterceptor` trio, `createApplicationContainerGuard(meEndpoint, signInRoute)`, and the shared auth/profile form components. Anything that varies per app (storage key, API base URL, "who am I" endpoint, sign-in route) is parametrized via an `InjectionToken` (services/classes) or a factory-function parameter (interceptors/guards) — never hardcoded — and provided per app in that app's `app.config.ts`. Global cross-app Sass partials (buttons, cards, forms, nav, tables, toasts, fonts, etc.) live in `projects/boilerplate-utils/styles/` (outside the lib's `src/`, so `ng-packagr` doesn't touch them) and are consumed via `stylePreprocessorOptions.includePaths` in each app's `angular.json`, not file imports.

### Cross-cutting naming convention

"User" and "Administrator" are the two audiences/tenants running through the entire stack (Nest apps, JWT secrets, Angular projects, ports, URLs, OneSignal app IDs). When adding a feature that needs to exist for both, expect to touch the parallel structure in both `apps/boilerplate-user`/`apps/boilerplate-administrator` (Nest) and `projects/boilerplate-user`/`projects/boilerplate-administrator` (Angular).
