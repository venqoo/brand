/**
 * `light` (default) and `dark` are explicit; `auto` follows the visitor's
 * `prefers-color-scheme`. Pick `dark` for a dark footer on a site without a
 * colour-scheme toggle — the component cannot see what it sits on.
 */
export type CreditTheme = 'light' | 'dark' | 'auto'

export interface CreditLinkProps {
  /** Where the credit links to. Defaults to https://www.venqoo.com. */
  href?: string
  /** Open the link in a new tab (default) so the visitor stays on the client site. */
  newTab?: boolean
}

export interface CreditBaseProps extends CreditLinkProps {
  theme?: CreditTheme
  className?: string
}
