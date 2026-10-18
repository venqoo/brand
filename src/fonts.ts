/**
 * The venqoo type contract. Hosts load the font files themselves (Archivo and
 * JetBrains Mono are both open licensed and on Google Fonts / Fontsource);
 * these stacks only say which faces to ask for and what to fall back to.
 */
export const fonts = {
  /** Archivo, used for everything. */
  sans: '"Archivo", system-ui, sans-serif',
  /** JetBrains Mono, used for code only. */
  mono: '"JetBrains Mono", ui-monospace, monospace',
  /** The wordmark is Archivo at width 118 and weight 500. */
  wordmark: { family: 'Archivo', stretch: '118%', weight: 500 },
} as const
