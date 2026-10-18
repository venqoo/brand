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
<Credit />                                   // Made with ♥ by venqoo in Würzburg
<Credit variant="pill" theme="dark" />       // outline pill on a dark footer

// imprint / legal notice
<ImprintCredit />                            // heading, sentence, address
<ImprintCredit lang="de" />                  // the same, in German
<ImprintCredit
  variant="card"
  roles={[
    { term: 'App', detail: 'iOS & Android' },
    { term: 'Backend', detail: 'API & integrations' },
  ]}
/>
```

Every variant is a single link to `https://www.venqoo.com` that opens in a new
tab. Footer copy is English only; the imprint credit also comes in German.

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

### Shared props

| Prop        | Type                          | Default                  |
| ----------- | ----------------------------- | ------------------------ |
| `theme`     | `'light' \| 'dark' \| 'auto'` | `'light'`                |
| `href`      | `string`                      | `https://www.venqoo.com` |
| `newTab`    | `boolean`                     | `true`                   |
| `className` | `string`                      | —                        |

`theme` switches the colour tokens: use `dark` for a dark footer, `auto` on
sites with a colour-scheme toggle (it follows `prefers-color-scheme`). The
component cannot see what it sits on, so `light` is the predictable default.

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
