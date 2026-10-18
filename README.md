# @venqoo/brand

"Made by venqoo" footer credits and Impressum credit blocks for websites and
apps built by [venqoo](https://www.venqoo.com). React components plus one
self-contained stylesheet — no runtime dependencies, no network requests, no
styles leaking into the host site.

```bash
npm install @venqoo/brand
```

```tsx
import { Credit, ImprintCredit } from '@venqoo/brand'
import '@venqoo/brand/styles.css'

// footer
<Credit />                                   // Made with ♥ by venqoo in Würzburg
<Credit variant="pill" theme="dark" />       // outline pill on a dark footer

// imprint / legal notice
<ImprintCredit />                            // heading, sentence, address
<ImprintCredit
  variant="card"
  roles={[
    { term: 'App', detail: 'iOS & Android' },
    { term: 'Backend', detail: 'API & integrations' },
  ]}
/>
```

Every variant is a single link to `https://www.venqoo.com` that opens in a new
tab. Copy is English only.

## `<Credit>` — footer credit

| `variant`     | Renders                                            |
| ------------- | -------------------------------------------------- |
| `heart`       | Made with ♥ by **venqoo** in Würzburg (default)    |
| `mark`        | UFO mark · Designed & built by **venqoo**          |
| `pill`        | Outline pill with the mark · Made by venqoo        |
| `pill-signal` | Orange pill, white mark · Made with love by venqoo |

`heart` and `mark` inherit the host's font, size and text colour, so they sit
in any footer's legal bar; only the heart, the mark and the hover state use
venqoo orange. The two pills bring their own surface and type.

## `<ImprintCredit>` — Impressum / legal notice

| `variant` | Renders                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `section` | Heading, sentence, address with links (default); inherits the page type |
| `card`    | Bordered card: eyebrow, logo, **project roles**, address, link          |

`roles` is how a project says what venqoo was responsible for. It is an array of
`{ term, detail }`, shown as a definition list on `card`. The default list is
concept / design / development / operations; pass your own, or `[]` to hide it.
`children` replaces the descriptive sentence on `section`, and `headingLevel`
(2–4) matches the imprint's other headings.

## Shared props

| Prop        | Type                          | Default                  |
| ----------- | ----------------------------- | ------------------------ |
| `theme`     | `'light' \| 'dark' \| 'auto'` | `'light'`                |
| `href`      | `string`                      | `https://www.venqoo.com` |
| `newTab`    | `boolean`                     | `true`                   |
| `className` | `string`                      | —                        |

`theme` switches the colour tokens: use `dark` for a dark footer, `auto` on
sites with a colour-scheme toggle (it follows `prefers-color-scheme`). The
component cannot see what it sits on, so `light` is the predictable default.

## Styling

All styles live under `.vq-credit` and are driven by CSS custom properties
(`--vqc-text`, `--vqc-muted`, `--vqc-line`, `--vqc-surface`, `--vqc-signal`, …).
Override them on a wrapper or via `className` to tune a variant to a client's
palette. The wordmark on the card uses a 1 KB subset of Archivo embedded in the
stylesheet (SIL OFL), so it renders identically everywhere without loading a
web font — nothing is fetched from Google Fonts or anywhere else.

## Development

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build          # dist/: ESM, .d.ts, styles.css
pnpm storybook      # stories under Credit/
```

Releases are published to npm by `.github/workflows/release.yml` when a `v*`
tag is pushed.
