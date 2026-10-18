import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Heart, Logo, UfoMark } from './marks.js'

describe('marks', () => {
  it('the mark is decorative and inherits currentColor', () => {
    const html = renderToStaticMarkup(<UfoMark />)
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('fill="currentColor"')
  })

  it('the heart is announced with its label', () => {
    const html = renderToStaticMarkup(<Heart label="love" />)
    expect(html).toContain('role="img"')
    expect(html).toContain('<title>love</title>')
  })

  it('the logo pairs the mark with the wordmark', () => {
    const html = renderToStaticMarkup(<Logo className="x" />)
    expect(html).toContain('class="vq-logo x"')
    expect(html).toContain('vq-logo__mark')
    expect(html).toContain('<span class="vq-logo__wordmark">venqoo</span>')
  })
})
