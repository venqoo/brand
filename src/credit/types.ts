/**
 * `light` (default) and `dark` are explicit; `auto` follows the visitor's
 * `prefers-color-scheme`. Pick `dark` for a dark footer on a site without a
 * colour-scheme toggle — the component cannot see what it sits on.
 */
export type CreditTheme = 'light' | 'dark' | 'auto'

/**
 * How the link is qualified for search engines. `nofollow` and `sponsored` tell
 * crawlers not to treat the link as an endorsement of venqoo; `follow` leaves it
 * unqualified. `noopener` is added on top whenever the link opens in a new tab.
 *
 * The footer credit defaults to `nofollow`: it is the same link in the template
 * of many sites, which Google asks to be qualified. The imprint credit defaults
 * to `follow`: a single sentence naming the maker of the site. Use `sponsored`
 * when the credit is part of a deal, e.g. a discount for keeping it.
 */
export type CreditRel = 'follow' | 'nofollow' | 'sponsored'

export interface CreditLinkProps {
  /** Where the credit links to. Defaults to https://www.venqoo.com. */
  href?: string
  /**
   * The client site the credit sits on, e.g. `"baeckerei-muster.de"`. When set,
   * the link carries campaign parameters (`utm_source` = site, `utm_medium` =
   * credit, `utm_campaign` = footer or imprint, `utm_content` = variant), so
   * venqoo's analytics can tell which site, placement and design a visitor came
   * from. Nothing runs or is tracked on the client site itself.
   */
  site?: string
  /** Search-engine qualification of the link; see {@link CreditRel} for the defaults. */
  rel?: CreditRel
  /** Open the link in a new tab (default) so the visitor stays on the client site. */
  newTab?: boolean
}

export interface CreditBaseProps extends CreditLinkProps {
  theme?: CreditTheme
  className?: string
}
