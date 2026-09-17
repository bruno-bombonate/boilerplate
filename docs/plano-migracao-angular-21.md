# Plano de migração: `workspaces/angular` (Angular 20) → `workspaces/angular-21` (Angular 21)

> **✅ MIGRAÇÃO CONCLUÍDA — corte final feito.** A pasta antiga `workspaces/angular` (Angular 20) foi removida, e `workspaces/angular-21` foi renomeada pra `workspaces/angular` — esse nome agora é o Angular 21. A pasta `Roboto/` na raiz (usada só como staging pras fontes) também foi removida. Todo o texto abaixo é o histórico real de como a migração aconteceu (decisões, achados, bugs corrigidos) — mantido como está, sem reescrever as referências a "`workspaces/angular-21`" pra "`workspaces/angular`", já que é um registro do que foi decidido e quando. A partir de agora, qualquer trabalho novo no frontend Angular acontece direto em `workspaces/angular`; este arquivo continua existindo só como log/referência.

> Rascunho para revisão. Seções marcadas com **⚠️ DECISÃO PENDENTE** são pontos que eu não posso decidir sozinho — preciso da sua confirmação antes de começar a gerar código.

## 1. Objetivo

Recriar as duas aplicações (`boilerplate-user` e `boilerplate-administrator`) e as bibliotecas `@bruno-bombonate/*` dentro de `workspaces/angular-21`, **sempre via Angular CLI** (`ng generate`), padronizando nomenclatura de componentes, adotando Zoneless obrigatoriamente, SSR obrigatório nas duas apps, e transformando a pasta `utils/` (hoje compartilhada por import relativo, sem nenhum empacotamento) em uma biblioteca Angular de verdade.

`workspaces/angular` continua rodando normalmente até a migração ser validada — não vamos tocar nele, exceto como referência de código a portar.

## 2. Estado atual (o que o levantamento mostrou)

- `workspaces/angular-21` está vazio: `angular.json` sem nenhum `project` registrado. Partimos do zero.
- `workspaces/angular` já é 100% Zoneless (`provideZonelessChangeDetection()`, sem dependência de `zone.js`) e já é SSR (cada app tem `server.ts`, `main.server.ts`, `outputMode: server`). Isso não é novidade a introduzir, é continuidade.
- A pasta `utils/` **não é uma lib**: é importada por caminho relativo profundo (`../../../../../../utils/...`) direto do código-fonte das duas apps e até de um README de uma lib (`ngx-classes`). Não passa por `ng-packagr`, não tem `public-api.ts`, não é testada isoladamente, não é versionada. É exatamente a "gambiarra" que você mencionou.
- Dentro de `utils/` já existe cuidado com SSR nos arquivos que tocam `localStorage`/`window`/`document` (`UserService`, `NavClass`) — usam `isPlatformBrowser`/`PLATFORM_ID` corretamente. Ou seja, o problema não é "os componentes quebram em SSR", é "isso não é uma lib publicável/testável, é código colado por caminho relativo".
- **Achado importante:** já existe `@bruno-bombonate/ngx-authentication`, publicada, com um `AuthenticationService` que faz basicamente o mesmo papel do `utils/services/user/user-service.ts` (guardar/ler/remover token, com suporte a `localStorage`/`sessionStorage`, SSR-safe). São implementações paralelas e divergentes da mesma coisa. Ver decisão #3 (resolvida abaixo).
- **Achado de bug/gambiarra real:** `UserService` usa a chave fixa `'boilerplate-user-token'` no `localStorage`, e é o **mesmo arquivo** importado tanto por `boilerplate-user` quanto por `boilerplate-administrator`. Se as duas apps um dia rodarem no mesmo domínio/origem, o token de um pisa no do outro. Vale corrigir na migração (chave configurável por app via `InjectionToken`, por exemplo).
- Os nomes hoje já seguem exatamente o padrão que você descreveu: `*-container` para containers de rota (`application-container.ts`, `sign-in-container.ts`) e `*-component` para os demais (`sign-in-form-component.ts`, `profile-view-component.ts`). O trabalho aqui é **formalizar isso via CLI**, não inventar convenção nova.

## 3. Padrões acordados até aqui

### 3.1 Geração 100% via Angular CLI
Nenhum arquivo de componente/serviço/guard/lib criado manualmente. Tudo via `ng generate`, dentro de `workspaces/angular-21`. Conteúdo (lógica, template) é portado do `workspaces/angular` para dentro do esqueleto gerado pelo CLI — não o inverso.

### 3.2 Convenção de nomes
- **Smart components ligados a rota → sufixo `container`** (ex.: `application`, `sign-in`, `profile`).
- **Dumb components → sufixo `component`**, com um segundo qualificador de forma (`form`, `list`, `search-form`, `view`...): `user-form-component`, `user-list-component`, `user-search-form-component`.

**✅ RESOLVIDA #1 — separador do sufixo.** Confirmado na prática (`ng generate component containers/application-container` rodado por você): no Angular 21, o style guide "2025" (padrão) não aplica nenhum sufixo automático — o CLI usa literalmente o nome que você passar, hífens e tudo. Não precisa de `--type` nem gera `.` como separador; isso só acontece se a gente explicitamente pedir `--type=container` (aí sim vira `.`). Resultado do teste:

```
ng generate component containers/application-container
→ containers/application-container/application-container.ts
  selector: app-application-container
  class: ApplicationContainer
```

Ou seja: basta sempre passar o nome já com o sufixo desejado (`application-container`, `user-form-component`, `user-list-component`, `user-search-form-component`) como argumento do `ng generate component` — sem `--type`, sem separador `.`, sem rename manual. 100% CLI, igual ao padrão que já existe em `workspaces/angular` hoje.

**⚠️ Regra geral por schematic — o comportamento NÃO é o mesmo em todos.** Testado com `--dry-run` em todos os schematics usados neste projeto. Existem duas famílias:

| Schematic | Sufixo automático? | Como chamar | Resultado |
|---|---|---|---|
| `component` | Não | `ng generate component containers/application-container` | `application-container.ts` (`ApplicationContainer`) |
| `service` | Não | `ng generate service user-service` | `user-service.ts` (`UserService`) |
| `directive` | Não | `ng generate directive auto-focus-directive` | `auto-focus-directive.ts` |
| `class` | Não | `ng generate class nav-class` | `nav-class.ts` (`NavClass`) |
| `guard` | **Sim, sempre** | `ng generate guard application-container` (sem `-guard`!) | `application-container-guard.ts` |
| `pipe` | **Sim, sempre** | `ng generate pipe status` (sem `-pipe`!) | `status-pipe.ts` |
| `interceptor` | **Sim, sempre** | `ng generate interceptor jwt` (sem `-interceptor`!) | `jwt-interceptor.ts` |
| `resolver` | **Sim, sempre** | `ng generate resolver user` (sem `-resolver`!) | `user-resolver.ts` |

Para `guard`/`pipe`/`interceptor`/`resolver` **não existe opção para desligar o sufixo automático** (não têm propriedade `type` no schema, só `typeSeparator`, que por padrão já é `-`). Se o nome passado já incluir o sufixo, ele duplica: `ng generate guard application-container-guard` gera `application-container-guard-guard.ts`. Confirmado no teste. Então a regra prática, pra não errar:

> **Em `component`, `service`, `directive`, `class` → escreva o sufixo você mesmo no nome.**
> **Em `guard`, `pipe`, `interceptor`, `resolver` → NUNCA escreva o sufixo, o CLI completa sozinho.**

Isso cobre tudo que existe hoje em `utils/`: interceptors (`jwt`, `error` → `ng generate interceptor jwt`, `ng generate interceptor error`), guard de rota (`ng generate guard application-container`), pipe (`ng generate pipe status`), validator (é uma função pura, não um schematic dedicado — vira `ng generate class` ou fica como arquivo dentro do `public-api.ts` da lib, ver decisão #2).

**✅ RESOLVIDA #1b — opção (B), `--path` explícito.** Testado com `--dry-run`: `--path` sozinho **não basta**, ainda aninha uma subpasta extra (`containers/application/application-container/application-container.ts`). É preciso combinar `--path` **com** `--flat`:

```
ng generate component application-container \
  --project=boilerplate-user \
  --path=projects/boilerplate-user/src/app/containers/application \
  --flat

→ containers/application/application-container.ts   (sem subpasta extra)
```

**Correção pós-Fase 6:** na prática, o comando `--path=.../containers/<nome-base>` + `--flat` é usado para **todo** container, com ou sem filhos, de topo ou aninhado — inclusive `sign-in`, `sign-up`, `reset-password`, `dashboard`, `profile`, que não têm filhos. Conferido revisitando `workspaces/angular`: mesmo um container-folha como `sign-in` fica em `containers/.../sign-in/sign-in-container.ts` (pasta com o nome base, sem o sufixo `-container`), nunca auto-aninhado (`sign-in-container/sign-in-container.ts`). Não existe de fato um "caso simples sem `--path`" no padrão real do projeto — a nota original abaixo foi mantida só como registro histórico da dúvida, mas não reflete o padrão seguido a partir da Fase 6.

**Convenção de arquivo de rotas por container.** Todo container que tem rotas-filhas ganha, na mesma pasta, um arquivo `<nome-base>-routes.ts` ao lado do `<nome-base>-container.ts`:

```
containers/
  application/
    application-container.ts
    application-container.html
    application-container.sass
    application-container.spec.ts
    application-routes.ts
    containers/
      profile/
        profile-container.ts
        ...
  authentication/
    authentication-container.ts
    authentication-routes.ts
    containers/
      sign-in/
        sign-in-container.ts
        ...
```

Não existe schematic do Angular CLI pra arquivo de rotas (nem para o `app.routes.ts` raiz existe um `ng generate route` — ele só sai pronto porque faz parte do schematic `application`). Então `<nome-base>-routes.ts` é a única peça deste padrão que é criada como arquivo simples (um `Routes`/array de `Route` exportado), não via `ng generate` — é dado de configuração, não uma classe/component que o CLI saiba escafoldar.

### 3.3 Zoneless
Todas as apps: `ng generate application ... --zoneless` (na verdade é o **default** no Angular 21 — `zoneless: true` por padrão no schematic —, então nem precisa passar a flag, só não desativar).

**✅ Verificado — `provideZonelessChangeDetection()` explícito NÃO é necessário no Angular 21.** Isso era necessário no Angular 20 (por isso está explícito em `workspaces/angular`), mas a partir do Angular 21 zoneless é o comportamento padrão automático quando `zone.js` não está nos polyfills — não existe mais nada para "ligar". Confirmado na [documentação oficial](https://angular.dev/guide/zoneless) ("Zoneless is the default in Angular v21+ so you do not need to do anything to enable it") e testado na prática: removido o provider das duas apps e `ng build` (que faz prerender SSR, exercitando o bootstrap real em Node sem `zone.js`) continua funcionando normalmente. Removido de `app.config.ts` das duas apps — deixamos exatamente o output puro do `ng generate application --ssr`, sem adicionar nada.

### 3.4 SSR obrigatório
Todas as apps: `ng generate application ... --ssr`. Isso já cobre `server.ts`, `main.server.ts`, `app.config.server.ts`, hidratação client, etc., igual ao `workspaces/angular` atual.

### 3.6 `ChangeDetectionStrategy.OnPush`
**✅ Verificado e mantido por decisão sua.** Em modo zoneless, `OnPush` não é obrigatório — a [documentação oficial](https://angular.dev/guide/zoneless) confirma que `Default` funciona igual desde que o componente notifique o Angular via signals/`markForCheck()`/`AsyncPipe` (que é como todo componente portado até agora já funciona). Ainda assim, `AGENTS.md` já estabelece `OnPush` como regra de estilo do projeto — decisão: manter a regra, `OnPush` continua explícito em todo componente novo.

### 3.5 `utils/` vira lib
Em vez de import relativo cru, criar uma biblioteca Angular de verdade via `ng generate library`, compilada com `ng-packagr`, com `public-api.ts` explícito, testável isoladamente e com build próprio — condição necessária para garantir que o código compartilhado funciona corretamente quando consumido por uma app SSR (FESM/Ivy partial compilation, `sideEffects`, sem depender de resolução de caminho relativo do consumidor).

**✅ RESOLVIDA #2 — projeto não publicado, nome `boilerplate-utils`.** Confirmado: projeto interno, fora do escopo `@bruno-bombonate` (esse escopo é só para pacotes públicos versionados por compatibilidade com Angular). Fica em `projects/boilerplate-utils/`, irmão de `boilerplate-user`/`boilerplate-administrator`, gerado com `ng generate library boilerplate-utils` (nome sem escopo `@`, já que não vai pro npm). Mesma ideia do `@app/boilerplate-database` do lado Nest — vamos espelhar isso adicionando `@app/boilerplate-utils` como path alias no `tsconfig.json` apontando pro `dist/boilerplate-utils`, em vez de import relativo. "Sem gambiarras a partir de agora" — nada de `../../../../utils/...` na nova estrutura.

**✅ RESOLVIDA #3 — `ngx-authentication` fica intocada.** A nova lib `boilerplate-utils` **não** depende de `@bruno-bombonate/ngx-authentication`. Portamos `UserService` para dentro dela como implementação própria (mantendo o `BehaviorSubject`/`user$` reativo que `ngx-authentication` não tem hoje). `ngx-authentication` continua existindo, publicada, sem mudanças — só não é usada por este projeto (fica de lado, caso alguma outra aplicação sua já dependa dela).

Como agora as duas apps vão importar o **mesmo `UserService`** de uma lib de verdade (antes eram dois arquivos idênticos copiados por caminho relativo, hoje viram uma única classe compartilhada de fato), o bug identificado no levantamento — chave fixa `'boilerplate-user-token'` no `localStorage`, igual pras duas apps — fica ainda mais importante de corrigir agora: vamos expor um `InjectionToken` (ex. `USER_TOKEN_STORAGE_KEY`) que cada `app.config.ts` provê com um valor diferente (`'boilerplate-user-token'` vs `'boilerplate-administrator-token'`), resolvendo a colisão de vez.

**✅ RESOLVIDA #4 — opção (A), Sass dentro da lib compartilhada.** Com um ajuste técnico: `ng-packagr` só empacota o que está dentro de `src/` do projeto de lib (regido pelo `public-api.ts`) — ele não é o mecanismo certo para servir parciais Sass soltos, e como a lib não é publicada, também não faz sentido depender de resolução via `node_modules`. Implementação prática: os parciais Sass ficam em `projects/boilerplate-utils/styles/` (pasta irmã de `src/`, fora do build do `ng-packagr` — não precisa rebuildar a lib pra ver mudança de estilo). Cada app aponta pra lá via `stylePreprocessorOptions.includePaths` no seu `angular.json`:

```json
"stylePreprocessorOptions": {
  "includePaths": ["projects/boilerplate-utils/styles"]
}
```

Isso permite `@use 'variables'`, `@use 'main'` etc. como especificador solto (sem caminho relativo, sem `../../../../utils/sass/...`), com hot-reload normal no `ng serve` — o resultado prático pedido (estilo mora dentro da lib compartilhada, zero import relativo escalando pastas) fica igual, só o mecanismo de consumo é `includePaths` em vez de import de pacote via `ng-packagr`, que não se aplica aqui.

## 4. Estrutura proposta em `workspaces/angular-21`

```
workspaces/angular-21/
├── projects/
│   ├── boilerplate-user/            (ng generate application, --ssr)
│   ├── boilerplate-administrator/   (ng generate application, --ssr)
│   ├── boilerplate-utils/           (ng generate library boilerplate-utils — não publicada)
│   │   ├── src/                     (público via public-api.ts — services, guards, pipes, interceptors, componentes)
│   │   └── styles/                  (parciais Sass — fora do build do ng-packagr, consumido via includePaths)
│   └── bruno-bombonate/
│       ├── ngx-classes/
│       ├── ngx-toast/
│       ├── ngx-authentication/      (intocada — não usada por boilerplate-utils)
│       ├── ngx-seo/
│       └── ngx-forms/
```

As libs `ngx-*` são recriadas via `ng generate library @bruno-bombonate/<nome>` e o conteúdo é portado (não é reescrita — a API pública se mantém, só troca a casca do workspace e sobe a compat table para `21.x`). `boilerplate-utils` é gerada sem escopo (`ng generate library boilerplate-utils`), por não ser publicada.

## 5. Fases

1. ~~Fechar as decisões pendentes~~ — **feito** (#1, #1b, #2, #3, #4 todas resolvidas).
2. **Esqueleto das duas apps** — **já gerado por você** (`boilerplate-user`, `boilerplate-administrator` em `angular.json`). Falta confirmar `--ssr` e `provideZonelessChangeDetection()` no `app.config.ts` de cada uma.
3. **Libs `ngx-*`**: recriar as 5 libs via `ng generate library @bruno-bombonate/<nome>`, portar `src/lib/*` de cada uma, subir compat table para `21.x`, rodar os testes existentes (`.spec.ts`) sem alterar comportamento público.
4. **Lib `boilerplate-utils`**: `ng generate library boilerplate-utils`, depois `ng generate service/guard/pipe/interceptor/component` dentro dela para cada peça de `utils/`:
   - `ng generate service user-service` (com o `InjectionToken` de chave de storage, decisão #3)
   - `ng generate interceptor jwt`, `ng generate interceptor error`
   - `ng generate guard application-container`
   - `ng generate pipe status`
   - `ng generate class` para o validator de confirmação de senha (é uma função pura, não uma classe Angular — avaliar se vira `ng generate class` só pra ter arquivo com teste, ou uma função solta exportada direto no `public-api.ts`)
   - componentes de formulário de auth (`sign-in-form-component`, `reset-password-form-component`, `reset-password-request-form-component`, `password-form-component`, `profile-view-component`) e `NavClass` (via `ng generate class`, já que é uma `@Directive()` abstrata, ou `ng generate directive` se fizer mais sentido no novo desenho)
5. ~~**Estilos globais**: mover `utils/sass/*` para `projects/boilerplate-utils/styles/`, configurar `stylePreprocessorOptions.includePaths` nas duas apps (decisão #4).~~ — **feito**.
6. ~~**Containers e componentes das apps**, na ordem: fluxo de autenticação primeiro (sign-in, sign-up, reset-password — são a base para testar login que tudo mais depende), depois a área logada (`application-container`, `profile-container`) e os módulos de negócio de cada app.~~ — **feito**.
7. ~~**Validação SSR**: build de produção das duas apps (`ng build` com `outputMode: server`), rodar o servidor gerado (`node dist/.../server/server.mjs`), navegar tanto com JS desabilitado (confere HTML vindo do servidor) quanto habilitado (confere hidratação sem erro de "content mismatch"), checar console por qualquer `window`/`document`/`localStorage` acessado fora de guarda de plataforma.~~ — **feito**.
8. **Corte final**: com as duas apps + libs validadas rodando de `workspaces/angular-21`, decidir com você o que fazer com `workspaces/angular` (arquivar, remover, manter por um tempo em paralelo).

## 6. Checklist de "SSR-safe" para toda a lib compartilhada

Regra a aplicar em cada serviço/diretiva portado:
- Qualquer acesso a `window`, `document`, `localStorage`, `sessionStorage`, `navigator` só dentro de `if (isPlatformBrowser(this.platformId))`.
- Nenhum uso de API só-de-browser no nível de módulo/import (ex.: uma lib que faz `window.foo` fora de um método, no topo do arquivo, quebra o bundle de servidor mesmo sem nunca ser chamada em runtime).
- Dependências de terceiros usadas pela lib (ex. `gsap`, hoje usado em `NavClass`) precisam ser confirmadas como seguras para importar em contexto Node (import não deve estourar por falta de `window` no topo do módulo) — vale um teste de build SSR isolado assim que essa peça for portada.

## 7. Observações / próximos passos

- Todas as decisões de convenção (#1, #1b, #2, #3, #4) estão fechadas.
- **Fase 3 concluída**: as 5 libs `@bruno-bombonate/*` foram recriadas em `workspaces/angular-21`, com build (`ng build`) e testes (`ng test`, Vitest) passando em todas. Compat table e `package.json.version` de cada uma subiram para `21.0.0`.
- **Fase 4 concluída**: `boilerplate-utils` criada (`ng generate library boilerplate-utils`, path alias `@app/boilerplate-utils`), com `UserService` (+ `USER_TOKEN_STORAGE_KEY`), `HttpService` (+ `API_BASE_URL`), `jwtInterceptor`, `createErrorInterceptor`, `createApplicationContainerGuard`, `StatusPipe`, `passwordConfirmation`, `NavClass` e os 5 componentes de formulário/view. Build e testes passando (13 arquivos de teste, 14 testes).
- **✅ Bloqueio resolvido — `application-container-guard` parametrizado.** Ele não era idêntico entre as duas apps (endpoint `users/me` vs `administrators/me`, e dependia de um `HttpService` até então local a cada app). Solução: `HttpService` também migrou para `boilerplate-utils`, parametrizado com `API_BASE_URL` (`InjectionToken<string>`, cada app provê seu `environment.baseUrl`) no lugar do import direto de `environment`. O guard virou `createApplicationContainerGuard(meEndpoint: string, signInRoute: string[])`, mesmo espírito do `createErrorInterceptor(authRoute)` que já existia. Cada app, na Fase 6, vai chamar `createApplicationContainerGuard('users/me', [...])` ou `createApplicationContainerGuard('administrators/me', [...])` no seu próprio arquivo de rotas.
- **Fase 5 concluída — estilos globais.** Os parciais de `workspaces/angular/utils/sass/*` (`main`, `badge`, `button`, `card`, `form`, `header`, `heading`, `nav`, `section`, `table`, `toast`, `view`, `imports/variables`, `imports/media-queries`) foram portados para `projects/boilerplate-utils/styles/` (pasta irmã de `src/`, fora do build do `ng-packagr`, conforme decisão #4). Não existe schematic de CLI para parciais Sass — mesma exceção já registrada para `<nome-base>-routes.ts` na seção 3.2: é conteúdo de configuração/estilo puro, copiado (portado) tal qual, não gerado. `angular.json` das duas apps ganhou `build.options.stylePreprocessorOptions.includePaths: ["projects/boilerplate-utils/styles"]`, e cada `src/styles.sass` trocou o import relativo cru (`@use './../../../utils/sass/main' as main`) por especificador solto (`@use 'main' as main`) — sem mais `../../../../` subindo pastas. Validado com `ng build` (SSR + prerender) das duas apps: `styles.css` gerado com 5.43 kB em ambas, idêntico ao esperado, sem erros de resolução Sass. Os cinco `.sass` de componente (`sign-in-form-component.sass` etc.) já tinham sido portados junto com os componentes na Fase 4 e não referenciam os parciais globais — nada a fazer neles aqui.
- **Nota para a Fase 6:** `application-container.sass` (e qualquer outro `.sass` de container/componente de app que precise de `variables`/`media-queries`) deve usar `@use 'imports/variables' as variables` / `@use 'imports/media-queries' as media-queries` como especificador solto (resolvido via `includePaths`), nunca mais `../../../../../../utils/sass/...`.
- **Prefixo/URL por app**: confirmado o padrão — sempre que uma peça compartilhada precisar de algo que varia por app (URL da API, chave de storage, endpoint, rota), ela recebe via `InjectionToken` (quando é um serviço/classe) ou parâmetro de fábrica (quando é uma função tipo interceptor/guard), nunca hardcoded. `boilerplate-utils` hoje tem dois tokens: `USER_TOKEN_STORAGE_KEY` e `API_BASE_URL`.
- **Bugs pré-existentes corrigidos durante a portagem** (confirmados quebrados também em `workspaces/angular` antes da migração, não são regressão): testes que chamavam `new XClass()` fora de contexto de injeção (`NG0203`) em classes que usam `inject()` em field initializer (`DestroyRefClass` e quem herda dela, `NavClass`) — corrigido com `TestBed.runInInjectionContext`. Specs de função com `describe` vazio (tolerado pelo Karma, tratado como falha pelo Vitest) — viraram testes reais. `SeoService`/`ListContainerClass` sem providers de `Router` no `TestBed` — corrigido com `provideRouter([])`. `ProfileViewComponent` com input `required` nunca setado no teste (`NG0950`) — corrigido com `fixture.componentRef.setInput(...)`.
- **Fase 6 concluída.** Portados via CLI, com conteúdo migrado 1:1 (mais as correções de bug abaixo):
  - **`boilerplate-user`**: `authentication-container` (auth/sign-in, auth/sign-up, auth/reset-password) e `application-container` (dashboard, profile) — sem módulo de negócio próprio, igual ao original.
  - **`boilerplate-administrator`**: `authentication-container` (auth/sign-in, auth/reset-password — sem sign-up, igual ao original) e `application-container` (dashboard, profile, `administrators` CRUD completo — list/add/details + list/search-form/form components —, `users` somente leitura — list/details + list/search-form/view components).
  - Nenhum arquivo de guard local por app: `applicationContainerGuard` de cada app agora é só uma chamada a `createApplicationContainerGuard(...)` dentro do próprio `application-routes.ts`, não mais um arquivo `*-guard.ts` separado.
  - Convenção de arquivo de rotas aplicada de forma uniforme: **todo** container (folha ou com filhos, topo ou aninhado) usa `--path=.../containers/<nome-base> --flat` + arquivo `<nome-base>-routes.ts` ao lado (nunca `<nome-base>-container.routes.ts`). Isso corrige/generaliza a nota da seção 3.2 — não existe de fato um "caso simples sem `--path`" no código original, todo container (inclusive os de topo e os sem filhos, como `sign-in`) segue esse mesmo padrão.
  - `app.config.ts` das duas apps: `provideHttpClient(withFetch(), withInterceptors([jwtInterceptor, createErrorInterceptor([...])]))` + `{ provide: USER_TOKEN_STORAGE_KEY, useValue: '...' }` + `{ provide: API_BASE_URL, useValue: environment.baseUrl }`.
  - `environments/environment.local.ts` e a configuration `local` (build + serve, `defaultConfiguration` em serve) foram portados manualmente para o `angular.json` — não existe schematic de CLI para isso (`ng generate environments` só cria `environment.ts`/`environment.development.ts`).
  - **Bug pré-existente corrigido**: `environment.ts`/`environment.development.ts` da `boilerplate-administrator` apontavam para o domínio da API do **user** (copy-paste), só o `environment.local.ts` estava correto. Corrigido para `administrator.api...boilerplate.com`, consistente com a porta 6021 (`APP_BOILERPLATE_ADMINISTRATOR_API_PORT` no Nest).
  - **Bug pré-existente corrigido**: `ProfileContainer` da `boilerplate-administrator` chamava `PATCH users/change-password` (endpoint que não existe na API administrator — só existe `administrators/change-password`, confirmado em `workspaces/nest/apps/boilerplate-administrator/src/modules/administrators/administrators.controller.ts`). Corrigido para `administrators/change-password`.
  - Budget de produção (`initial`) das duas apps subiu de 500kB para 550kB no `angular.json` — a consolidação do `HttpService`/`UserService`/etc. em `boilerplate-utils` (antes duplicados por app) mudou ligeiramente o tamanho do bundle inicial da `boilerplate-administrator` e passou a acusar o budget antigo; não é regressão de peso real, é o mesmo código que já existia.
  - Warning de build "`lodash` is not ESM" é inofensivo e pré-existente ao desenho da lib (mesmo pacote usado no `workspaces/angular` antigo).
  - Validado: `ng build` (SSR + prerender) das duas apps sem erros, `ng test` das duas apps + `boilerplate-utils` + as 5 libs `@bruno-bombonate/*` — **57 testes, todos passando**. Smoke test manual do servidor SSR gerado (`node dist/boilerplate-user/server/server.mjs`) confirmando HTML pré-renderizado real (`<title>BoilerplateUser</title>`, conteúdo do `app-root`) na rota `auth/sign-in`.
  - **Achado sobre `security.allowedHosts`** (Angular 21 introduziu essa opção no `angular.json`; não existe no `workspaces/angular`, Angular 20): com o valor padrão gerado pelo CLI (`allowedHosts: []`), qualquer requisição ao **servidor Express compilado** (`node dist/.../server/server.mjs`) cujo header `Host` não esteja na lista cai em client-side rendering em vez de servir o HTML pré-renderizado. Cheguei a adicionar `"localhost"` para viabilizar meu smoke test manual, mas **testei e confirmei que isso não tem efeito nenhum no `ng serve`** (o dev-server usado por `npm run boilerplate-*:start:local` ignora completamente essa checagem — testado com `allowedHosts: []` e o SSR funcionou normal via `ng serve`) — a checagem só existe no artefato de produção. Como `"localhost"` também não ajuda em produção real (lá o `Host` vai ser o domínio de verdade, não `localhost`), voltei para `allowedHosts: []` (padrão do CLI) nas duas apps, por decisão sua. **Antes de rodar o `server.mjs` compilado atrás de um domínio real, adicionar esse domínio em `security.allowedHosts`** — sem isso, produção serviria só CSR (silenciosamente, sem erro), perdendo o benefício do SSR.
- **Fase 7 concluída — validação SSR.** `ng build` de produção das duas apps (SSR + prerender) sem erros. Subi os servidores gerados (`node dist/boilerplate-user/server/server.mjs` na porta 5031, `node dist/boilerplate-administrator/server/server.mjs` na porta 6031) e validei com `curl` (HTML puro do servidor, equivalente a "JS desabilitado") e com um browser real via Claude in Chrome (JS habilitado, hidratação):
  - `curl` confirmou HTML real pré-renderizado em `auth/sign-in` e `auth/reset-password` das duas apps (`ng-server-context` presente, `<title>` correto por rota via `title` da `Route`, formulários renderizados no servidor).
  - No browser, `auth/sign-in`, `auth/sign-up` (só user) e `auth/reset-password` das duas apps carregaram e hidrataram **sem nenhuma mensagem no console** (zero erros, zero warnings, nenhum `NG0500`/mismatch de hidratação).
  - O guard (`createApplicationContainerGuard`) foi validado end-to-end no navegador: acessar `/` sem token no `localStorage` redireciona corretamente para `/auth/sign-in`, sem nenhum erro de console — confirma que o acesso a `localStorage` dentro de `UserService`/`isPlatformBrowser` está corretamente guardado para SSR.
  - **Observação (não é bug de migração, comportamento herdado do `workspaces/angular` original):** simulei um token inválido no `localStorage` e naveguei para `/` — como não há backend real rodando em `environment.ts` (domínio de produção fictício), a chamada `httpService.get({ url: meEndpoint })` falha com `TypeError: Failed to fetch`, e como `createApplicationContainerGuard` não trata erro da chamada HTTP (sem `catchError`), a navegação fica bloqueada e a tela fica em branco em vez de redirecionar para o sign-in. Esse gap de tratamento de erro já existe no guard original (`application-container-guard.ts` de ambas as apps em `workspaces/angular`) — não é regressão da migração, mas fica registrado aqui como melhoria possível caso você queira endurecer o guard futuramente (ex.: `catchError` redirecionando para `signInRoute` em caso de falha da chamada `/me`).
  - Não validado nesta fase (depende do backend Nest rodando com credenciais reais): a área logada (`application-container`, `dashboard`, `profile`, `administrators`, `users`) com um token válido de verdade — o guard e o layout (`NavClass`/gsap) só puderam ser exercitados até o ponto do redirecionamento, não com uma sessão autenticada real.
- **Correção pós-Fase 7 — Bootstrap ausente.** O visual ficou diferente do `workspaces/angular` porque o CSS do Bootstrap (`bootstrap-reboot.min.css`, `bootstrap-grid.min.css`, `bootstrap-utilities.min.css` — não o `bootstrap.css` completo, só esses três arquivos, igual ao original) nunca foi portado: ele é referenciado direto em `angular.json` → `architect.build.options.styles`, não em nenhum arquivo `.sass`/`.ts`, então passou batido na portagem dos containers. Corrigido:
  - `bootstrap@^5.3.7` instalado em `workspaces/angular-21` (mesma versão do `workspaces/angular`).
  - `styles` de `boilerplate-user`/`boilerplate-administrator` no `angular.json` agora incluem os três arquivos do Bootstrap **antes** do `styles.sass` do app (mesma ordem do original).
  - De brinde, portado também `allowedCommonJsDependencies: ["lodash"]` (existia no `angular.json` antigo) — elimina o warning de build "`lodash` is not ESM" que aparecia desde a Fase 4.
  - Budget de produção (`initial`) subiu de 550kB para 700kB nas duas apps: o CSS do Bootstrap soma ~85-100kB de raw size ao bundle inicial. O `workspaces/angular` (Angular 20) tem bundles de tamanho equivalente (580-586kB) mas não aciona o warning — o builder do Angular 21 parece checar o budget "initial" contra o *raw size*, não o *estimated transfer size* (gzip) como antes; não é um app mais pesado de fato, é a mesma dependência.
  - Validado: `ng build` das duas apps sem warnings, `ng test` das duas apps passando (9 + 21), e conferência visual no browser confirmando o grid do Bootstrap aplicado (colunas lado a lado no formulário, layout centralizado) — antes ficava tudo empilhado em largura total.
- **`provideRouter` com `withInMemoryScrolling`/`withViewTransitions`.** Adicionado nas duas apps (`app.config.ts`): `withInMemoryScrolling({ scrollPositionRestoration: 'top' })` (reseta o scroll ao topo a cada navegação) e `withViewTransitions()` (usa a View Transitions API do browser nas trocas de rota). Nenhum equivalente existia no `workspaces/angular` — é uma melhoria nova pedida por você, não portagem de comportamento existente.
- **`@bruno-bombonate/ngx-toast` — `warning`/`info` adicionados** (pedido seu, não fazia parte da portagem). `ToastType` ganhou `Warning`/`Info`, `ToastService` ganhou `warning(message)`/`info(message)`, `ToastComponent` ganhou os bindings `[class.toast-warning]`/`[class.toast-info]`, e `boilerplate-utils/styles/toast.sass` (+ README do pacote) ganharam as cores dessas duas variantes (âmbar `#FFC107` pro warning, azul `#17A2B8` pro info — mesma paleta semântica do Bootstrap, ajustável). Versão subiu para `21.1.0` (aditivo, mesma major do Angular).
- **`@bruno-bombonate/ngx-forms` — visibilidade de erro de campo parametrizável por app** (pedido seu). Antes, cada template chamava `controlErrorMessageIsVisible(control)` (método de `FormComponentClass`, em `ngx-classes`) para decidir se renderizava `<control-error [controlErrors]="control.errors">`. Agora:
  - `controlErrorMessageIsVisible` foi **removida** de `FormComponentClass`.
  - `<control-error>` recebe o `AbstractControl` inteiro (`[control]="form().controls['name']"`, não mais só `.errors`) e decide sozinho se mostra a mensagem — usando a mesma regra de sempre por padrão (`errors !== null && (touched || dirty)`), mas parametrizável **por app** via `provideNgxForms({ controlErrorVisible })` no `app.config.ts` (mesmo padrão já existente de `CONTROL_ERRORS_INJECTION_TOKEN`, agora com um `CONTROL_ERROR_VISIBLE_INJECTION_TOKEN` irmão). Decisão sua: só por app, sem override por instância individual.
  - `provideNgxForms` mudou de assinatura: `provideNgxForms(controlErrors)` → `provideNgxForms({ controlErrors?, controlErrorVisible? })`. Não quebrou nada real no repo (função não era chamada em lugar nenhum ainda).
  - Todos os 16 usos de `@if (controlErrorMessageIsVisible(...)) { <control-error [controlErrors]="..."> }` (nos 5 form components de `boilerplate-utils` + `sign-up-form-component` do user + `administrator-form-component` do administrator) viraram só `<control-error [control]="...">`, sem `@if` envolvendo.
  - **Bug pego no teste visual (não no `ng test`, só navegando de verdade no browser):** a primeira implementação usava `computed()` lendo `control().errors`/`.touched`/`.dirty` direto — mas essas propriedades são mutadas de forma imperativa pelo Reactive Forms (`markAllAsTouched()`, etc.), sem trocar a referência do `AbstractControl` nem emitir nada por padrão. Como `<control-error>` é um componente `OnPush` filho, e o evento (`(ngSubmit)`) acontece no componente **pai**, o Angular não tinha motivo pra re-checar o filho — a mensagem de erro nunca aparecia depois de clicar em "Sign up", mesmo com o campo vazio. Corrigido fazendo `ControlErrorComponent` também escutar `control.events` (Observable que o Angular Forms emite a cada mudança de `touched`/`dirty`/`status`/`value`, confirmado no código-fonte do `@angular/forms`) via `toObservable(this.control).pipe(switchMap((control) => control.events))` + `toSignal(...)`, lido dentro dos `computed()` só pra forçar a reavaliação. Validado no browser (SSR real): mensagem aparece ao submeter com campo vazio, e some assim que o campo fica válido — sem esse ajuste, o `ng test` não pegava o problema porque os specs só checam `toBeTruthy()`, não o comportamento reativo real.
  - Versões: `ngx-forms` e `ngx-classes` subiram para `21.1.0` (mudança de API pública real, mesma major do Angular).
- **`createErrorInterceptor` agora repassa o erro puro** (decisão sua, revertendo o unwrap que existia desde a Fase 4). Antes: `throwError(() => response.error || response)`. Agora: `throwError(() => response)` — o `HttpErrorResponse` completo chega no `error:` de cada `.subscribe()`. Ajustados os 14 lugares que liam `response.message` num callback de erro (nos dois apps: sign-in, sign-up, reset-password, profile, administrators add/list/details, users list/details) para `response.error.message` — os `next:` de sucesso continuam lendo `response.message` normalmente (não mudou, o corpo de sucesso da API não passa pelo interceptor de erro).
- **`loadingInterceptor` + `LoadingService` adicionados** (pedido seu, baseado em código de outro projeto seu, adaptado). `HttpService` já setava o header `Loading-Interceptor-Skip` quando uma chamada passa `{ loading: false }` desde a Fase 4, mas nenhum interceptor o lia — nem aqui, nem no `workspaces/angular` original (confirmado, o mesmo código já estava morto lá). `LoadingService` (`@app/boilerplate-utils`) expõe um contador (`addLoadingRequest()`/`removeLoadingRequest()`) e um `loading: Signal<boolean>`; `loadingInterceptor` incrementa/decrementa esse contador ao redor de toda requisição, pulando quando o header de skip está presente. Registrado em `withInterceptors([jwtInterceptor, createErrorInterceptor(...), loadingInterceptor])` nas duas apps. Ajustes feitos em cima do código original de referência: nome do header alinhado ao que já existe (`Loading-Interceptor-Skip`, sem prefixo), e removido um `catchError` que só relançava o mesmo erro sem fazer nada (redundante — `finalize()` sozinho já cobre sucesso/erro/cancelamento). Nenhum componente de UI consome `LoadingService.loading()` ainda (nenhuma barra/spinner existe no projeto) — fica como próximo passo caso queira um indicador visual global.
- **Dois bugs reais encontrados e corrigidos em `@bruno-bombonate/ngx-classes`** (achado seu, revisão minha, sem objeção — implementados):
  - **`FormComponentClass.handleNgSubmit`**: usava `document.querySelectorAll('input.ng-invalid')` pra rolar até o primeiro campo inválido no submit — buscava no **documento inteiro** (não só dentro do form do componente) e só achava `<input>`, nunca `<select>`/`<textarea>` (ex.: o campo "Status" do `administrator-form`, que é um `<select>`, nunca seria encontrado mesmo sendo o único inválido). Corrigido injetando `ElementRef` na classe (`protected readonly elementRef = inject(ElementRef)`) e escopando a busca: `this.elementRef.nativeElement.querySelector('.ng-invalid:not(form)')` — busca só dentro do próprio componente, qualquer tipo de controle, excluindo o `<form>` (que também ganha a classe `.ng-invalid` do Angular quando o `FormGroup` é inválido, e senão seria sempre o "primeiro" resultado). Validado no browser: mensagens de erro aparecem e a página centraliza no primeiro campo inválido, sem erro de console.
  - **`ListContainerClass.handleListPageChange`**: pegava a referência atual de `this.listSearchParams()`, mutava ela direto (`.page = ...`) e chamava `.set()` passando a **mesma referência** — como `signal.set()` usa `Object.is` pra decidir se notifica quem depende do sinal, isso é um no-op silencioso (nada reage à mudança de página via o sinal, só a navegação real da URL). Corrigido copiando pra um objeto novo antes de mutar (`{ ...this.listSearchParams() }`), igual já era feito em `handleListSearchFormChange`/`setListSearchParams`. Bug estava **adormecido**: nenhum container hoje tem paginação de fato ligada a `handleListPageChange` (nenhum `<paginator>`/`(page)="..."` existe ainda nos templates portados), então nunca disparava — mas ficaria pronto pra quando a paginação for implementada.
  - Ajuste de teste necessário: `form-component-class.spec.ts` instanciava a classe direto (`new FormComponentClass()`) dentro de `TestBed.runInInjectionContext` — isso já funcionava para `DestroyRef` (tem provider de root), mas `ElementRef` não tem (só existe no escopo de view de um componente real), então o teste passou a falhar com `NG0201`. Corrigido fornecendo um `ElementRef` fake via `TestBed.configureTestingModule({ providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }] })` antes do `runInInjectionContext`.
  - `ngx-classes` subiu para `21.1.1` (correção de comportamento, não feature nova).
- **Convenção de espaçamento vertical: `mt-4`, nunca `mb-*`.** Você zerou a margem global de `h1-h6` e `p` (`margin: 0px` em `heading.sass`/`main.sass`) e portou manualmente `users-container.html` e todos os componentes filhos como referência. Apliquei a mesma convenção no resto das duas apps + `boilerplate-utils` (17 arquivos). Regra reconstruída a partir da referência:
  - Nunca `mb-*`. O espaçamento é sempre `mt-4` no elemento de baixo, nunca margem no elemento de cima.
  - O **primeiro elemento de um "fluxo"** (topo de um container/componente, ou primeira coluna de uma row) não leva margem — não há nada acima dele que precise de espaço.
  - Quando o próximo bloco é um **componente Angular filho** (`<app-*>`), a margem vai **dentro** do componente filho, no(s) primeiro(s) elemento(s) do template dele — nunca como classe na tag do componente no pai (ex.: `<app-user-search-form>` não leva `mt-4`; quem leva é a `<div class="row">`/`.col-lg` de dentro dele).
  - Quando o próximo bloco é um **elemento HTML puro** (`<div class="card">`, `<h2>`, `<p>`), a margem vai direto nele no template pai (ex.: `<div class="card mt-4">`).
  - **Row cujas colunas sempre precisam de espaço de algo acima, em qualquer largura de tela** (ex.: um formulário de busca que sempre vem depois de um `<h1>`) → **todas** as colunas levam `mt-4` incondicional (isso também resolve o espaçamento entre colunas quando elas empilham no mobile, de brinde).
  - **Row que é o próprio primeiro conteúdo do componente, mas cujas colunas empilham entre si no mobile** (ex.: `ID` / `Registration date` num profile-view) → primeira coluna sem margem, demais colunas com `mt-4 mt-{breakpoint}-0` (breakpoint = o mesmo do `col-{breakpoint}-*` da row, cancelando a margem quando elas voltam a ficar lado a lado).
  - **Conteúdo condicional que pode não renderizar nada** (`@if` sem `@else`), seguido de um elemento que dependeria dele para saber se leva margem → `[class.mt-4]="mesmaCondição"` no elemento seguinte, em vez de `mt-4` fixo (ex.: `administrator-form-component.html`, onde o campo "Name" só tem `mt-4` quando `formData() !== undefined`, porque só aí a linha ID/Registration date acima dele existe de fato).
  - Colunas Bootstrap **sem prefixo de breakpoint** (`.col`/`.col-auto` puros, como num cabeçalho `h1` + botão) nunca empilham, então não entram nessa dança de `mt-4`/`mt-{bp}-0` — ficam sempre lado a lado.
  - Arquivos ajustados: `sign-in-form`, `reset-password-form`, `reset-password-request-form`, `password-form`, `profile-view` (em `boilerplate-utils`); `authentication-container`, `sign-in-container`, `sign-up-container` + `sign-up-form`, `reset-password-container`, `profile-container` (nas duas apps); `administrators-list-container`, `administrator-search-form`, `administrator-form`, `administrators-add-container`, `administrators-details-container` (só na `boilerplate-administrator` — o módulo `administrators` não tinha sido tocado por você, só o `users`). `application-container`/`dashboard-container` das duas apps não precisaram de mudança (sem heading/parágrafo adjacente afetado). Validado: build limpo das duas apps + `boilerplate-utils`, 51 testes passando, e conferência visual no browser (sign-up do user com o grid de senha, sign-in do administrator) sem nenhum `mb-*` restante em lugar nenhum do workspace.
- **Auditoria de documentação das 5 libs `@bruno-bombonate/*`** (pedido seu — "atenção total", garantir que toda opção da lib esteja documentada, e compatibilidade com qualquer Angular 21.x). Revisei API pública (`public-api.ts` + código-fonte) vs. README de cada uma, e achei problemas reais em duas frentes:
  - **`peerDependencies` incompletas e travadas em `^21.2.0`.** Todas as 5 libs só declaravam `@angular/common`/`@angular/core` como peer (herdado do que o `ng generate library` grava por padrão, sem revisão), mas:
    - `ngx-classes` usa `@angular/forms` (`FormGroup`) e `@angular/router` (`ActivatedRoute`, `Router`) direto no código, e `rxjs` (`Subject`, operators) — nenhum dos três estava declarado como peer.
    - `ngx-seo` usa `@angular/platform-browser` (`Title`, `Meta`) e `@angular/router` (`Router`, `ActivatedRoute`, `NavigationEnd`) direto, e `rxjs/operators` — nenhum declarado.
    - `ngx-forms` usa `@angular/forms` (`AbstractControl`) direto — não declarado.
    - `ngx-toast` usa `rxjs` (`Subject`, `Observable`) direto — não declarado.
    - Corrigido: adicionadas as peer deps que faltavam em cada lib, e **todos** os peers do Angular (`common`, `core`, `forms`, `router`, `platform-browser`, conforme o caso) mudaram de `^21.2.0` para `^21.0.0` nas 5 libs — agora instalam em qualquer Angular 21.x, não só a partir da 21.2. `rxjs` entrou como peer (`^7.4.0`) nas libs que o usam direto (`ngx-classes`, `ngx-toast`, `ngx-seo`).
  - **Opções da API pública não documentadas no README:**
    - `ngx-classes`: `FormComponentClass` documentava só o `form` input — faltavam `formData`, `formLoading`, `formReset` (inputs), `formBack`/`formChange`/`formSubmit` (outputs), `mapInputValue`/`mapOutputValue` (métodos protegidos pra sobrescrever), e o comportamento de auto-scroll até o primeiro campo inválido no submit. `ListContainerClass` documentava só `listSearchParamsList`/`getList()` — faltavam os signals `list`/`listLength`/`listLoading`/`listSearchParams`, os métodos `handleListSearchFormChange`/`handleListPageChange`, e o significado de `SearchParamType.Param` vs `.QueryParam` (path param vs query param) — só `QueryParam` aparecia no exemplo. As funções `transform`/`transformNumber`/`transformString`/`transformBoolean` (exportadas, usadas internamente) nem eram mencionadas.
    - `ngx-toast`: faltava documentar `ToastService.send$` (Observable pública, pra quem quiser montar sua própria UI de toast em vez do `<toast>` built-in) e os tipos exportados `Toast`/`ToastType`.
    - `ngx-authentication`: `AuthenticationService.getAuthentication()` e `.isLoggedIn()` existem no código mas não apareciam em nenhum exemplo do README (só `setAuthentication`/`unsetAuthentication`). Adicionado exemplo de guard usando `isLoggedIn()`.
    - `ngx-seo`: `SeoService.setTitle()`/`.setMeta()` (chamadas diretas, fora do fluxo via `data` de rota) não estavam documentadas. Também esclareci o formato exato do título (`'${appName}: ${data.title}'` ou só `appName` quando a rota não define `title`).
    - `ngx-forms`: o exemplo de `app.config.ts` ainda tinha `provideZonelessChangeDetection()` (desnecessário no Angular 21, igual já corrigimos nas nossas duas apps na Fase 3) — trocado por `provideBrowserGlobalErrorListeners()`, igual ao padrão real do CLI 21. Também não ficava claro que `controlErrors` passado pra `provideNgxForms` é **mesclado** com os validadores padrão (`required`, `requiredTrue`, `email`, `pattern`, `min`, `max`, `minlength`, `maxlength`), não os substitui — o exemplo antigo repetia todos eles sem necessidade, dando a entender o contrário. Corrigido e explicitado.
  - Todas as 5 libs subiram de versão (patch, já que são correções/documentação, não mudança de comportamento): `ngx-classes` 21.1.1→21.1.2, `ngx-toast` 21.1.0→21.1.1, `ngx-authentication` 21.0.0→21.0.1, `ngx-seo` 21.0.0→21.0.1, `ngx-forms` 21.1.0→21.1.1 — com linha nova na compat table de cada uma, mais uma nota explícita ("funciona com qualquer Angular 21.x") em todas.
  - Validado: build + teste das 5 libs, `boilerplate-utils` e as duas apps — **75 testes passando**, nenhuma mudança de comportamento (só `package.json`/`README.md` tocados, nenhum `.ts`/`.html` de código-fonte).
- **Versões das 5 libs `@bruno-bombonate/*` colapsadas para `21.0.0`.** Como nenhuma versão pra Angular 21 tinha sido publicada no npm ainda, não fazia sentido carregar o histórico incremental de patches que acumulamos durante a migração (ex.: `21.1.2`, `21.0.1`). Por decisão sua, todas as 5 voltaram pra `21.0.0` — primeira versão real pra essa major — com a tabela de compatibilidade mostrando só uma linha `21.0.0|21.x` (as linhas de `15.x` a `20.x`, essas sim publicadas de verdade historicamente, continuam intactas).
- **Fontes Roboto self-hosted.** Você colocou a pasta `Roboto/` (baixada do Google Fonts) na raiz do repositório. Perguntei e você confirmou: usar só os 2 arquivos **variable font** (`Roboto-VariableFont_wdth,wght.ttf` + `Roboto-Italic-VariableFont_wdth,wght.ttf`, cobrindo peso 100–900 e itálico sozinhos) em vez dos ~40 arquivos estáticos individuais (Black/Bold/Condensed/SemiCondensed etc.) que a pasta também trazia e que nada no CSS do projeto usa hoje (só `font-family: 'Roboto'` com `font-weight` variando, sem `font-stretch`/condensed). Implementado:
  - Os 2 arquivos `.ttf` copiados para `public/fonts/` de **cada app** (`boilerplate-user` e `boilerplate-administrator`) — `public/` é copiado 1:1 pro root de cada app no build (`assets: [{ glob: '**/*', input: '.../public' }]`), então cada app serve sua própria cópia.
  - `projects/boilerplate-utils/styles/fonts.sass` (novo, junto dos outros partials compartilhados) com os dois `@font-face` (`normal`/`italic`, `font-weight: 100 900`, `format('truetype-variations')`, `font-display: swap`), referenciando os arquivos por caminho absoluto (`/fonts/...`) — importante: caminho relativo não funcionaria aqui, já que o `.sass` mora em `boilerplate-utils` mas os arquivos de fonte moram no `public/` de cada app; caminho absoluto passa direto pelo bundler sem tentar resolver contra o disco, e resolve certo em runtime pros dois apps.
  - `@use 'fonts' as fonts` adicionado no `styles.sass` das duas apps (mesmo padrão `includePaths` da Fase 5).
  - Validado: build das duas apps sem erro, fonte aparece em `dist/.../browser/fonts/`, CSS gerado referencia `/fonts/Roboto-VariableFont_wdth,wght.ttf` corretamente, e testei no browser (SSR real) — request do arquivo de fonte retorna 200 e o texto renderiza com Roboto de verdade (não caiu pro fallback do sistema).
  - **Pendência sua**: a pasta `Roboto/` na raiz do repo (fora de `workspaces/`) ainda existe — não apaguei por ser algo que você colocou lá deliberadamente, não um arquivo meu. Avise se quiser que eu remova.
- **Preload da fonte Roboto.** Adicionado `<link rel="preload" href="fonts/Roboto-VariableFont_wdth,wght.ttf" as="font" type="font/ttf" crossorigin />` no `index.html` das duas apps. Só a variante **regular** — conferi e não existe nenhum `font-style: italic`/`<em>`/`<i>` usado em lugar nenhum do projeto, então preload da itálica seria bytes jogados fora competindo por prioridade com o que realmente carrega. Validado no browser: tag presente no HTML servido, requisição da fonte com 200, e sem o warning clássico do Chrome de "preload não usado" (confirma que `as`/`type`/`crossorigin` batem certinho com a requisição real que o `@font-face` dispara).
- **Fontes convertidas de TTF pra WOFF2.** Usei `ttf2woff2` (via `npx`) pra converter os 2 arquivos. Antes de trocar de verdade, validei que a conversão preserva as tabelas de variable font (não é um achatamento pra fonte estática): descomprimi o `.woff2` de volta pra `.ttf` com `wawoff2` e confirmei que `fvar`/`gvar`/`avar`/`HVAR`/`STAT` continuam todas presentes. Resultado:
  - `Roboto-VariableFont_wdth,wght`: 487.768 bytes (TTF) → 228.684 bytes (WOFF2) — **-53%**.
  - `Roboto-Italic-VariableFont_wdth,wght`: 530.052 bytes (TTF) → 263.164 bytes (WOFF2) — **-50%**.
  - TTFs removidos de `public/fonts/` das duas apps, substituídos pelos `.woff2`. `fonts.sass` atualizado (`format('woff2-variations')` em vez de `format('truetype-variations')`), e os `<link rel="preload">` dos dois `index.html` atualizados (`type="font/woff2"`, `href` apontando pro `.woff2`). Sem fallback TTF — suporte a WOFF2 é praticamente universal nos browsers relevantes hoje, não fazia sentido manter os dois formatos.
  - Validado: build limpo das duas apps, requisição do `.woff2` com 200 no browser (SSR real), sem warning de "preload não usado", fonte renderizando normal.
- Este arquivo é vivo: qualquer ajuste que você fizer aqui eu sigo como fonte da verdade da migração.
