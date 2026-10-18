import type { ReactNode } from 'react'
import { cx } from '../cx.js'
import { Heart, UfoMark } from '../marks.js'
import { VENQOO } from '../venqoo.js'
import { footerCopy as t } from './copy.js'
import { linkAttrs } from './link.js'
import type { CreditBaseProps } from './types.js'

/**
 * - `heart`       — "Made with ♥ by venqoo in Würzburg"; inherits the host's font and colour
 * - `mark`        — UFO mark + "Designed & built by venqoo"; inherits the host's font and colour
 * - `pill`        — outline pill with the mark, "Made by venqoo"
 * - `pill-signal` — orange pill with the white mark, "Made with love by venqoo"
 */
export type CreditVariant = 'heart' | 'mark' | 'pill' | 'pill-signal'

export interface CreditProps extends CreditBaseProps {
  variant?: CreditVariant
}

/**
 * Footer credit: one link to venqoo in the style of your choice. Pass `site` so
 * visits can be attributed to the client site; the link is `nofollow` unless
 * `rel` says otherwise.
 */
export function Credit({
  variant = 'heart',
  theme = 'light',
  className,
  href,
  site,
  rel,
  newTab,
}: CreditProps) {
  const a = linkAttrs({
    href,
    site,
    rel,
    newTab,
    placement: 'footer',
    variant,
    defaultRel: 'nofollow',
  })
  const name = <span className="vq-credit__name">{VENQOO.name}</span>

  let content: ReactNode
  switch (variant) {
    case 'mark':
      content = (
        <>
          <UfoMark className="vq-credit__mark" />
          <span>
            {t.mark} {name}
          </span>
        </>
      )
      break
    case 'pill':
      content = (
        <>
          <UfoMark className="vq-credit__mark" />
          <span>
            {t.pill} {name}
          </span>
        </>
      )
      break
    case 'pill-signal':
      content = (
        <>
          <UfoMark className="vq-credit__mark" />
          <span>
            {t.pillSignal} {name}
          </span>
        </>
      )
      break
    default:
      content = (
        <>
          <span>{t.heartBefore}</span>
          <Heart className="vq-credit__heart" label={t.heartLabel} />
          <span>
            {t.heartAfter} {name} {t.heartTail}
          </span>
        </>
      )
  }

  return (
    <span
      className={cx('vq-credit', `vq-credit--${variant}`, className)}
      data-theme={theme}
      lang="en"
    >
      <a className="vq-credit__link" {...a}>
        {content}
      </a>
    </span>
  )
}
