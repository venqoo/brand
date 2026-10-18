import type { AnchorHTMLAttributes } from 'react'
import { DEFAULT_HREF } from './copy.js'
import type { CreditLinkProps, CreditRel } from './types.js'

/** Where on the client site the credit sits; becomes `utm_campaign`. */
export type CreditPlacement = 'footer' | 'imprint'

export interface CreditHrefOptions {
  /** Base URL; defaults to https://www.venqoo.com. */
  href?: string
  /** The client site, e.g. "baeckerei-muster.de". Without it the base URL is returned as is. */
  site?: string
  placement: CreditPlacement
  /** The component variant, e.g. "heart"; becomes `utm_content`. */
  variant: string
}

/** "https://www.Baeckerei-Muster.de/impressum" → "baeckerei-muster.de" */
export function normalizeSite(site: string): string {
  return site
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
    .replace(/^www\./, '')
    .replace(/[/?#].*$/, '')
}

/**
 * The credit's URL with campaign parameters when a `site` is given, so a visit
 * can be attributed to the client site, the placement and the variant. Existing
 * query parameters and fragments on `href` are kept.
 */
export function creditHref({
  href = DEFAULT_HREF,
  site,
  placement,
  variant,
}: CreditHrefOptions): string {
  const source = site ? normalizeSite(site) : ''
  if (!source) return href

  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: 'credit',
    utm_campaign: placement,
    utm_content: variant,
  })
  const hashAt = href.indexOf('#')
  const base = hashAt === -1 ? href : href.slice(0, hashAt)
  const hash = hashAt === -1 ? '' : href.slice(hashAt)
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}${params}${hash}`
}

export interface CreditLinkOptions extends CreditLinkProps {
  placement: CreditPlacement
  variant: string
  /** Qualification used when the `rel` prop is not given. */
  defaultRel: CreditRel
}

export function linkAttrs({
  href,
  site,
  rel,
  newTab = true,
  placement,
  variant,
  defaultRel,
}: CreditLinkOptions): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  const qualifier = rel ?? defaultRel
  // No `noreferrer`: besides the campaign parameters, the Referer header is how
  // venqoo sees which client site sent a visitor.
  const rels = [...(newTab ? ['noopener'] : []), ...(qualifier === 'follow' ? [] : [qualifier])]
  return {
    href: creditHref({ href, site, placement, variant }),
    ...(newTab ? { target: '_blank' } : {}),
    ...(rels.length > 0 ? { rel: rels.join(' ') } : {}),
  }
}
