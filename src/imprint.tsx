import type { ReactNode } from 'react'
import { defaultRoles, type ImprintRole, imprintCopy as t, VENQOO } from './copy.js'
import { cx, linkAttrs } from './link.js'
import { UfoMark } from './marks.js'
import type { CreditBaseProps } from './types.js'

/**
 * - `section` — heading, sentence and address; inherits the imprint's type (default)
 * - `card`    — bordered card with the logo, the project roles, address and link
 */
export type ImprintCreditVariant = 'section' | 'card'

export interface ImprintCreditProps extends CreditBaseProps {
  variant?: ImprintCreditVariant
  /** Heading element for `section`; match the imprint's other section headings. */
  headingLevel?: 2 | 3 | 4
  /**
   * What venqoo was responsible for in this project, shown on `card`.
   * Defaults to concept, design, development and operations; pass `[]` to hide the list.
   */
  roles?: readonly ImprintRole[]
  /** Replaces the descriptive sentence on `section`. */
  children?: ReactNode
}

/** Impressum / legal-notice credit naming venqoo GmbH as the maker of the site. */
export function ImprintCredit({
  variant = 'section',
  theme = 'light',
  headingLevel = 2,
  roles = defaultRoles,
  className,
  href,
  newTab,
  children,
}: ImprintCreditProps) {
  const a = linkAttrs({ href, newTab })
  const rootClass = cx('vq-credit', `vq-credit--${variant}`, className)
  const Heading = `h${headingLevel}` as const

  const siteLink = (
    <a className="vq-credit__textlink" {...a}>
      {VENQOO.displayUrl}
    </a>
  )

  if (variant === 'card') {
    return (
      <section className={rootClass} data-theme={theme} lang="en">
        <span className="vq-credit__eyebrow">{t.eyebrow}</span>
        <a className="vq-credit__link vq-credit__logo" {...a}>
          <UfoMark className="vq-credit__mark" />
          <span className="vq-credit__wordmark">{VENQOO.name}</span>
        </a>
        {roles.length > 0 && (
          <dl className="vq-credit__roles">
            {roles.map((role) => (
              <div className="vq-credit__role-item" key={role.term}>
                <dt>{role.term}</dt>
                <dd>{role.detail}</dd>
              </div>
            ))}
          </dl>
        )}
        <address className="vq-credit__address">
          <span>
            {VENQOO.legalName} · {VENQOO.street} · {VENQOO.postalCode} {VENQOO.city} ·{' '}
            {VENQOO.country}
          </span>
          {siteLink}
        </address>
      </section>
    )
  }

  return (
    <section className={rootClass} data-theme={theme} lang="en">
      <Heading className="vq-credit__heading">{t.heading}</Heading>
      <p className="vq-credit__body">
        {children ?? (
          <>
            {t.sentenceBefore}{' '}
            <a className="vq-credit__textlink" {...a}>
              {VENQOO.legalName}
            </a>
            {t.sentenceAfter}
          </>
        )}
      </p>
      <address className="vq-credit__address">
        <span className="vq-credit__address-name">{VENQOO.legalName}</span>
        <span>{VENQOO.street}</span>
        <span>
          {VENQOO.postalCode} {VENQOO.city}
        </span>
        <span>{VENQOO.country}</span>
        <a
          className="vq-credit__textlink vq-credit__textlink--quiet vq-credit__address-gap"
          href={`mailto:${VENQOO.email}`}
        >
          {VENQOO.email}
        </a>
        {siteLink}
      </address>
    </section>
  )
}
