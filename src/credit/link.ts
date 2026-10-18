import type { AnchorHTMLAttributes } from 'react'
import { DEFAULT_HREF } from './copy.js'
import type { CreditLinkProps } from './types.js'

export function linkAttrs({
  href = DEFAULT_HREF,
  newTab = true,
}: CreditLinkProps): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  // No `noreferrer`: the Referer header is how venqoo sees which client site sent a visitor.
  return newTab ? { href, target: '_blank', rel: 'noopener' } : { href }
}
