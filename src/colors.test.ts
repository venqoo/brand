import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { colors } from './colors.js'

const root = new URL('../', import.meta.url)
const camel = (s: string) => s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())

/** `--prefix-name: #hex` declarations in order; first hit is light, second is dark. */
function tokens(css: string, prefix: string) {
  const seen: Record<string, string[]> = {}
  for (const [, name, hex] of css.matchAll(
    new RegExp(`--${prefix}-([a-z-]+):\\s*(#[0-9a-f]{6})`, 'g'),
  )) {
    const key = camel(name)
    seen[key] ??= []
    seen[key].push(hex)
  }
  return seen
}

describe('palette', () => {
  it('styles.css carries the same values as the constants', () => {
    const css = tokens(readFileSync(new URL('styles.css', root), 'utf8'), 'vq')
    for (const [name, light] of Object.entries(colors.light)) {
      expect(css[name], name).toEqual([light, colors.dark[name as keyof typeof colors.dark]])
    }
  })

  it('credit.css does not drift from the constants', () => {
    const css = tokens(readFileSync(new URL('credit.css', root), 'utf8'), 'vqc')
    const alias: Record<string, keyof typeof colors.light> = { signalHover: 'signalBright' }
    for (const [name, values] of Object.entries(css)) {
      const key = alias[name] ?? (name as keyof typeof colors.light)
      expect(colors.light[key], `${name} is not a palette colour`).toBeDefined()
      expect(values[0], `${name} light`).toBe(colors.light[key])
      if (values[1]) expect(values[1], `${name} dark`).toBe(colors.dark[key])
    }
  })
})
