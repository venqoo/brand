/**
 * The venqoo palette. The same names serve both schemes: light is warm paper,
 * dark is warm near-black. One orange signal, darkened in light mode so it
 * stays AA on bright backgrounds.
 *
 * `@venqoo/brand/styles.css` sets the same values as `--vq-*` custom
 * properties; use these constants where CSS variables cannot reach (React
 * Native, canvas, generated images, e-mail).
 */
export const colors = {
  light: {
    /** Page background. */
    page: '#fefcfa',
    /** Raised panels and cards. */
    surface: '#ffffff',
    /** Hairline borders. */
    line: '#ece4da',
    /** Brand orange, AA on light backgrounds. */
    signal: '#c8410e',
    /** Brighter orange for hover states and gradients. */
    signalBright: '#e94e1b',
    /** Primary text. */
    text: '#211b16',
    /** Muted text. */
    muted: '#6e645b',
    /** Text and marks placed on the signal colour. */
    onSignal: '#ffffff',
  },
  dark: {
    page: '#0c0a09',
    surface: '#191512',
    line: '#282220',
    signal: '#e94e1b',
    signalBright: '#ff6a35',
    text: '#f4efe9',
    muted: '#a89f96',
    onSignal: '#ffffff',
  },
} as const

export type ColorScheme = keyof typeof colors
export type ColorName = keyof (typeof colors)['light']
