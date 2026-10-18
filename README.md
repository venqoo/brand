# @venqoo/brand

The venqoo brand kit: the palette, the type contract, the UFO mark and
wordmark, the SVG files, and "Made by venqoo" credit components for websites
and apps built by [venqoo](https://www.venqoo.com). React components plus two
self-contained stylesheets — no runtime dependencies, no network requests, no
styles leaking into the host site.

```bash
npm install @venqoo/brand
```

| Import                       | What you get                                                   |
| ---------------------------- | -------------------------------------------------------------- |
| `@venqoo/brand`              | Everything below, re-exported                                  |
| `@venqoo/brand/colors`       | The palette as constants, light and dark                       |
| `@venqoo/brand/fonts`        | Font stacks and the wordmark's face settings                   |
| `@venqoo/brand/marks`        | `UfoMark`, `Heart`, `Logo` React components                    |
| `@venqoo/brand/credit`       | `Credit` and `ImprintCredit` React components                  |
| `@venqoo/brand/styles.css`   | `--vq-*` custom properties, the wordmark face, `.vq-logo`      |
| `@venqoo/brand/credit.css`   | Styles for the credit components, self-contained               |
| `@venqoo/brand/assets/*.svg` | The logo and the UFO mark as files                             |

The React components work with React 18 and 19. Everything else is plain CSS,
JSON-shaped constants and SVG files, usable from any framework.

## Credit components

```tsx
import { Credit, ImprintCredit } from '@venqoo/brand/credit'
import '@venqoo/brand/credit.css'

// footer
<Credit site="baeckerei-muster.de" />                      // Made with ♥ by venqoo in Würzburg
<Credit site="baeckerei-muster.de" variant="pill" theme="dark" />

// imprint / legal notice
<ImprintCredit site="baeckerei-muster.de" />               // heading, sentence, address
<ImprintCredit site="baeckerei-muster.de" lang="de" />     // the same, in German
<ImprintCredit site="baeckerei-muster.de" subject="app" /> // "This app was designed…"
<ImprintCredit
  site="baeckerei-muster.de"
  variant="card"
  roles={[
    { term: 'App', detail: 'iOS & Android' },
    { term: 'Backend', detail: 'API & integrations' },
  ]}
/>
```

Every variant links to `https://www.venqoo.com` and opens in a new tab. Pass
`site` on every credit: it tags the link so venqoo can see where a visitor came
from (see [Attribution and search engines](#attribution-and-search-engines)).
Footer copy is English only; the imprint credit also comes in German.

### `<Credit>` — footer credit

| `variant`     | Renders                                            |
| ------------- | -------------------------------------------------- |
| `heart`       | Made with ♥ by **venqoo** in Würzburg (default)    |
| `mark`        | UFO mark · Designed & built by **venqoo**          |
| `pill`        | Outline pill with the mark · Made by venqoo        |
| `pill-signal` | Orange pill, white mark · Made with love by venqoo |

`heart` and `mark` inherit the host's font, size and text colour, so they sit
in any footer's legal bar; only the heart, the mark and the hover state use
venqoo orange. The two pills bring their own surface and type.

### `<ImprintCredit>` — Impressum / legal notice

| `variant` | Renders                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `section` | Heading, sentence, address with links (default); inherits the page type |
| `card`    | Bordered card: eyebrow, logo, **project roles**, address, link          |

`roles` is how a project says what venqoo was responsible for. It is an array of
`{ term, detail }`, shown as a definition list on `card`. The default list is
concept / design / development / operations; pass your own, or `[]` to hide it.
`children` replaces the descriptive sentence on `section`, and `headingLevel`
(2–4) matches the imprint's other headings.

`lang` is `'en'` (default) or `'de'`. It sets the heading, sentence, eyebrow,
country and default roles, and the root's `lang` attribute. Custom `roles` and
`children` are yours to translate. The default lists are exported as
`imprintRoles.en` / `imprintRoles.de` (`defaultRoles` is the English one), so a
project can extend them.

`subject` is `'website'` (default) or `'app'` and sets the first sentence's
subject: "This website was designed and developed by venqoo, a software agency
in Würzburg, Germany." becomes "This app was…" on an app's legal screen. A
second sentence says what venqoo GmbH does; `children` replaces both.

### Shared props

| Prop        | Type                                   | Default                                       |
| ----------- | -------------------------------------- | --------------------------------------------- |
| `site`      | `string`                               | — (set it: the client site's host)            |
| `rel`       | `'nofollow' \| 'follow' \| 'sponsored'` | `'nofollow'` on `Credit`, `'follow'` on `ImprintCredit` |
| `theme`     | `'light' \| 'dark' \| 'auto'`          | `'light'`                                     |
| `href`      | `string`                               | `https://www.venqoo.com`                      |
| `newTab`    | `boolean`                              | `true`                                        |
| `className` | `string`                               | —                                             |

`theme` switches the colour tokens: use `dark` for a dark footer, `auto` on
sites with a colour-scheme toggle (it follows `prefers-color-scheme`). The
component cannot see what it sits on, so `light` is the predictable default.

### Attribution and search engines

The package runs no script and loads nothing; the link is the whole tracker.
With `site="baeckerei-muster.de"`, a footer credit links to

```
https://www.venqoo.com?utm_source=baeckerei-muster.de&utm_medium=credit&utm_campaign=footer&utm_content=heart
```

`utm_source` is the site (normalised to its bare host), `utm_campaign` the
placement (`footer` or `imprint`) and `utm_content` the variant, so analytics
on venqoo.com show which site, placement and design a visitor clicked. Without
`site` the link is untagged; the Referer header then only names the origin, and
not at all on sites with a strict `Referrer-Policy`. Existing query parameters
and fragments on a custom `href` are kept. `creditHref()` builds the same URL
for links you render yourself.

`rel` says how search engines should read the link. Google asks for links that
sit in the template of many sites to be qualified, so the footer credit is
`nofollow` by default; the imprint credit is one editorial sentence naming the
maker and stays `follow`. Both can be overridden per project, and `sponsored` is
for credits that are part of a deal, such as a discount for keeping them. Links
that open in a new tab always carry `noopener`, never `noreferrer`.

### Styling the credit

All credit styles live under `.vq-credit` and are driven by CSS custom
properties (`--vqc-text`, `--vqc-muted`, `--vqc-line`, `--vqc-surface`,
`--vqc-signal`, …). Override them on a wrapper or via `className` to tune a
variant to a client's palette. `credit.css` is self-contained: it does not
need `styles.css`.

## Colours

```ts
import { colors } from '@venqoo/brand/colors'

colors.light.signal // '#c8410e'
colors.dark.text    // '#f4efe9'
```

| Name           | Light     | Dark      | Use                              |
| -------------- | --------- | --------- | -------------------------------- |
| `page`         | `#fefcfa` | `#0c0a09` | Page background                  |
| `surface`      | `#ffffff` | `#191512` | Raised panels and cards          |
| `line`         | `#ece4da` | `#282220` | Hairline borders                 |
| `signal`       | `#c8410e` | `#e94e1b` | Brand orange                     |
| `signalBright` | `#e94e1b` | `#ff6a35` | Hover states and gradients       |
| `text`         | `#211b16` | `#f4efe9` | Primary text                     |
| `muted`        | `#6e645b` | `#a89f96` | Muted text                       |
| `onSignal`     | `#ffffff` | `#ffffff` | Text and marks on the signal     |

`styles.css` sets the same values as `--vq-page`, `--vq-surface`, `--vq-line`,
`--vq-signal`, `--vq-signal-bright`, `--vq-text`, `--vq-muted` and
`--vq-on-signal` on `:root`, and switches to the dark scheme under `.dark` or
`[data-theme="dark"]`. A test keeps the constants and both stylesheets in sync.

## Type

```ts
import { fonts } from '@venqoo/brand/fonts'

fonts.sans      // '"Archivo", system-ui, sans-serif'
fonts.mono      // '"JetBrains Mono", ui-monospace, monospace'
fonts.wordmark  // { family: 'Archivo', stretch: '118%', weight: 500 }
```

Archivo for everything, JetBrains Mono for code. The package does not ship
font files; load them from Google Fonts or Fontsource. `styles.css` exposes the
stacks as `--vq-font-sans` and `--vq-font-mono`.

## Marks and logo

```tsx
import { Logo, UfoMark } from '@venqoo/brand/marks'
import '@venqoo/brand/styles.css'

<Logo style={{ fontSize: 24 }} />      // mark + wordmark, sized by font size
<UfoMark style={{ height: 32 }} />     // the mark alone, fills with currentColor
```

`UfoMark` is decorative (`aria-hidden`) and inherits `currentColor`. `Logo`
needs `styles.css` for the wordmark, which uses a 1 KB subset of Archivo
embedded in the stylesheet so it renders identically everywhere.

The same artwork as files, under `assets/`:

| File                     | Mark colour                        |
| ------------------------ | ---------------------------------- |
| `venqoo-logo.svg`        | Full logo with wordmark, orange    |
| `venqoo-ufo-signal.svg`  | Orange (`#e94e1b`)                 |
| `venqoo-ufo-ink.svg`     | Near-black (`#211b16`)             |
| `venqoo-ufo-chalk.svg`   | Off-white (`#f4efe9`)              |
| `venqoo-ufo-white.svg`   | White                              |
| `venqoo-ufo-orange.svg`  | White mark on an orange tile       |

```ts
import logoUrl from '@venqoo/brand/assets/venqoo-logo.svg'
```

## Company facts

`VENQOO` holds the name, legal name, address, URL and e-mail the imprint
renders, in case a project needs them elsewhere.

## Licence

The code is MIT. The venqoo name, mark and wordmark are trademarks of venqoo
GmbH and are included for crediting venqoo; see [BRAND.md](./BRAND.md).

## Development

```bash
pnpm install
pnpm check          # lint, typecheck, test, build
pnpm storybook      # stories under Brand/ and Credit/
```

Releases are published to npm by `.github/workflows/release.yml` when a `v*`
tag is pushed.
