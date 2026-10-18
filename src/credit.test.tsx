import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Credit, type CreditVariant } from './credit.js'
import { ImprintCredit, type ImprintCreditVariant } from './imprint.js'

const creditVariants: CreditVariant[] = ['heart', 'mark', 'pill', 'pill-signal']
const imprintVariants: ImprintCreditVariant[] = ['section', 'card']

describe('Credit', () => {
  it('links to www.venqoo.com in a new tab by default', () => {
    const html = renderToStaticMarkup(<Credit />)
    expect(html).toContain('href="https://www.venqoo.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener"')
    expect(html).not.toContain('noreferrer')
  })

  it('can stay in the same tab and point elsewhere', () => {
    const html = renderToStaticMarkup(
      <Credit href="https://www.venqoo.com/?ref=client" newTab={false} />,
    )
    expect(html).toContain('href="https://www.venqoo.com/?ref=client"')
    expect(html).not.toContain('target=')
    expect(html).not.toContain('rel=')
  })

  it.each(creditVariants)('renders the %s variant with its class and the name', (variant) => {
    const html = renderToStaticMarkup(<Credit variant={variant} />)
    expect(html).toContain(`vq-credit--${variant}`)
    expect(html).toContain('venqoo')
    expect(html).toMatch(/^<span class="vq-credit /)
    expect(html).not.toContain('→')
  })

  it('puts the theme on the root so the stylesheet can switch tokens', () => {
    expect(renderToStaticMarkup(<Credit theme="dark" />)).toContain('data-theme="dark"')
    expect(renderToStaticMarkup(<Credit />)).toContain('data-theme="light"')
  })

  it('announces the heart as "love" and hides the mark from screen readers', () => {
    expect(renderToStaticMarkup(<Credit variant="heart" />)).toContain('aria-label="love"')
    expect(renderToStaticMarkup(<Credit variant="mark" />)).toContain('aria-hidden="true"')
  })

  it('uses the mark, not a heart, on both pills', () => {
    for (const variant of ['pill', 'pill-signal'] as const) {
      const html = renderToStaticMarkup(<Credit variant={variant} />)
      expect(html).toContain('vq-credit__mark')
      expect(html).not.toContain('vq-credit__heart')
    }
  })
})

describe('ImprintCredit', () => {
  it.each(imprintVariants)('renders the %s variant linking to venqoo', (variant) => {
    const html = renderToStaticMarkup(<ImprintCredit variant={variant} />)
    expect(html).toContain(`vq-credit--${variant}`)
    expect(html).toContain('href="https://www.venqoo.com"')
    expect(html).not.toContain('→')
  })

  it('renders the section with the address and a configurable heading level', () => {
    const html = renderToStaticMarkup(<ImprintCredit headingLevel={3} />)
    expect(html).toContain('<h3 class="vq-credit__heading">Concept, design &amp; development</h3>')
    expect(html).toContain('Kaiserstr. 18')
    expect(html).toContain('<span>97070 Würzburg</span><span>Germany</span>')
    // e-mail before the website
    expect(html.indexOf('mailto:contact@venqoo.com')).toBeLessThan(html.lastIndexOf('>venqoo.com<'))
  })

  it('lists the project roles on the card and lets a project override them', () => {
    const defaults = renderToStaticMarkup(<ImprintCredit variant="card" />)
    expect(defaults).toContain('<dt>Development</dt>')

    const custom = renderToStaticMarkup(
      <ImprintCredit variant="card" roles={[{ term: 'App', detail: 'iOS & Android' }]} />,
    )
    expect(custom).toContain('<dt>App</dt><dd>iOS &amp; Android</dd>')
    expect(custom).not.toContain('Development')

    expect(renderToStaticMarkup(<ImprintCredit variant="card" roles={[]} />)).not.toContain('<dl')
  })

  it('lets children replace the sentence on the section', () => {
    const html = renderToStaticMarkup(
      <ImprintCredit>Relaunch and hosting by venqoo GmbH.</ImprintCredit>,
    )
    expect(html).toContain('Relaunch and hosting by venqoo GmbH.')
    expect(html).not.toContain('This website was designed')
  })
})
