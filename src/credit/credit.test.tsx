import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { imprintRoles } from './copy.js'
import { Credit, type CreditVariant } from './credit.js'
import { ImprintCredit, type ImprintCreditVariant } from './imprint.js'
import { creditHref, normalizeSite } from './link.js'

const creditVariants: CreditVariant[] = ['heart', 'mark', 'pill', 'pill-signal']
const imprintVariants: ImprintCreditVariant[] = ['section', 'card']

const href = (html: string) => /href="([^"]*)"/.exec(html)?.[1]

describe('credit link', () => {
  it('normalizes a site to its bare host', () => {
    expect(normalizeSite('baeckerei-muster.de')).toBe('baeckerei-muster.de')
    expect(normalizeSite(' https://www.Baeckerei-Muster.de/impressum?x=1#top ')).toBe(
      'baeckerei-muster.de',
    )
    expect(normalizeSite('http://shop.baeckerei-muster.de/')).toBe('shop.baeckerei-muster.de')
  })

  it('leaves the URL alone without a site', () => {
    expect(creditHref({ placement: 'footer', variant: 'heart' })).toBe('https://www.venqoo.com')
    expect(creditHref({ site: '  ', placement: 'footer', variant: 'heart' })).toBe(
      'https://www.venqoo.com',
    )
  })

  it('tags the URL with site, placement and variant', () => {
    expect(creditHref({ site: 'baeckerei-muster.de', placement: 'footer', variant: 'heart' })).toBe(
      'https://www.venqoo.com?utm_source=baeckerei-muster.de&utm_medium=credit&utm_campaign=footer&utm_content=heart',
    )
  })

  it('keeps existing query parameters and fragments', () => {
    expect(
      creditHref({
        href: 'https://www.venqoo.com/made-by?lang=de#contact',
        site: 'baeckerei-muster.de',
        placement: 'imprint',
        variant: 'card',
      }),
    ).toBe(
      'https://www.venqoo.com/made-by?lang=de&utm_source=baeckerei-muster.de&utm_medium=credit&utm_campaign=imprint&utm_content=card#contact',
    )
  })
})

describe('Credit', () => {
  it('links to www.venqoo.com in a new tab, nofollow, by default', () => {
    const html = renderToStaticMarkup(<Credit />)
    expect(html).toContain('href="https://www.venqoo.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener nofollow"')
    expect(html).not.toContain('noreferrer')
  })

  it('attributes the visit to the client site', () => {
    const html = renderToStaticMarkup(<Credit site="www.baeckerei-muster.de" variant="pill" />)
    expect(href(html)).toBe(
      'https://www.venqoo.com?utm_source=baeckerei-muster.de&amp;utm_medium=credit&amp;utm_campaign=footer&amp;utm_content=pill',
    )
  })

  it('can be followed or marked as sponsored', () => {
    expect(renderToStaticMarkup(<Credit rel="follow" />)).toContain('rel="noopener"')
    expect(renderToStaticMarkup(<Credit rel="sponsored" />)).toContain('rel="noopener sponsored"')
    expect(renderToStaticMarkup(<Credit newTab={false} />)).toContain('rel="nofollow"')
  })

  it('can stay in the same tab and point elsewhere', () => {
    const html = renderToStaticMarkup(
      <Credit href="https://www.venqoo.com/?ref=client" newTab={false} rel="follow" />,
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
  it.each(imprintVariants)('renders the %s variant linking to venqoo, followed', (variant) => {
    const html = renderToStaticMarkup(<ImprintCredit variant={variant} />)
    expect(html).toContain(`vq-credit--${variant}`)
    expect(html).toContain('href="https://www.venqoo.com" target="_blank" rel="noopener"')
    expect(html).not.toContain('nofollow')
    expect(html).not.toContain('→')
  })

  it.each(imprintVariants)(
    'attributes every venqoo link on the %s to the client site',
    (variant) => {
      const html = renderToStaticMarkup(
        <ImprintCredit variant={variant} site="baeckerei-muster.de" />,
      )
      const tagged =
        'https://www.venqoo.com?utm_source=baeckerei-muster.de&amp;utm_medium=credit&amp;utm_campaign=imprint&amp;utm_content=' +
        variant
      const venqooLinks = html.match(/href="https:\/\/www\.venqoo\.com[^"]*"/g) ?? []
      expect(venqooLinks.length).toBeGreaterThanOrEqual(2)
      for (const link of venqooLinks) expect(link).toBe(`href="${tagged}"`)
      if (variant === 'section') expect(html).toContain('href="mailto:contact@venqoo.com"')
    },
  )

  it('can be nofollowed like the footer credit', () => {
    expect(renderToStaticMarkup(<ImprintCredit rel="nofollow" />)).toContain(
      'rel="noopener nofollow"',
    )
  })

  it('says what venqoo does, for a website or an app', () => {
    expect(renderToStaticMarkup(<ImprintCredit />)).toContain(
      'This website was designed and developed by <a class="vq-credit__textlink" href="https://www.venqoo.com" target="_blank" rel="noopener">venqoo</a>, a software agency in Würzburg, Germany. venqoo GmbH builds apps, websites and custom software and advises companies on AI strategy and AI integration.',
    )
    expect(renderToStaticMarkup(<ImprintCredit subject="app" />)).toContain(
      'This app was designed and developed by',
    )
    expect(renderToStaticMarkup(<ImprintCredit subject="app" lang="de" />)).toContain(
      'Diese App wurde von <a',
    )
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

  it('is English by default and marks its language', () => {
    for (const variant of imprintVariants) {
      expect(renderToStaticMarkup(<ImprintCredit variant={variant} />)).toContain('lang="en"')
    }
  })

  it('renders the section in German', () => {
    const html = renderToStaticMarkup(<ImprintCredit lang="de" />)
    expect(html).toContain('lang="de"')
    expect(html).toContain('<h2 class="vq-credit__heading">Konzept, Design &amp; Entwicklung</h2>')
    expect(html).toContain(
      'Diese Website wurde von <a class="vq-credit__textlink" href="https://www.venqoo.com" target="_blank" rel="noopener">venqoo</a>, einer Software-Agentur aus Würzburg, gestaltet und entwickelt. Die venqoo GmbH entwickelt Apps, Websites und individuelle Software und berät Unternehmen zu KI-Strategie und KI-Integration.',
    )
    expect(html).toContain('<span>97070 Würzburg</span><span>Deutschland</span>')
    expect(html).not.toContain('Germany')
  })

  it('renders the card in German with German default roles', () => {
    const html = renderToStaticMarkup(<ImprintCredit variant="card" lang="de" />)
    expect(html).toContain('lang="de"')
    expect(html).toContain('Umgesetzt von')
    expect(html).toContain('<dt>Entwicklung</dt><dd>Frontend &amp; Backend</dd>')
    expect(html).toContain('Würzburg · Deutschland')
    expect(html).not.toContain('Development')

    const custom = renderToStaticMarkup(
      <ImprintCredit variant="card" lang="de" roles={[{ term: 'App', detail: 'iOS & Android' }]} />,
    )
    expect(custom).toContain('<dt>App</dt>')
    expect(custom).not.toContain('Entwicklung')
  })

  it('has a German entry for every English default role', () => {
    expect(imprintRoles.de).toHaveLength(imprintRoles.en.length)
  })

  it('lets children replace the sentence on the section', () => {
    const html = renderToStaticMarkup(
      <ImprintCredit>Relaunch and hosting by venqoo GmbH.</ImprintCredit>,
    )
    expect(html).toContain('Relaunch and hosting by venqoo GmbH.')
    expect(html).not.toContain('This website was designed')
  })
})
