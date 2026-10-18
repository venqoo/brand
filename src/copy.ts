/** Company facts rendered by the imprint variants. */
export const VENQOO = {
  name: 'venqoo',
  legalName: 'venqoo GmbH',
  street: 'Kaiserstr. 18',
  postalCode: '97070',
  city: 'Würzburg',
  country: 'Germany',
  url: 'https://www.venqoo.com',
  displayUrl: 'venqoo.com',
  email: 'contact@venqoo.com',
} as const

export const DEFAULT_HREF: string = VENQOO.url

/** Footer credit copy. English only — it reads the same on German sites. */
export const footerCopy = {
  heartBefore: 'Made with',
  heartLabel: 'love',
  heartAfter: 'by',
  heartTail: 'in Würzburg',
  mark: 'Designed & built by',
  pill: 'Made by',
  pillSignal: 'Made with love by',
} as const

export interface ImprintRole {
  /** What venqoo was responsible for, e.g. "Development". */
  term: string
  /** The specifics, e.g. "Front end & back end". */
  detail: string
}

export const imprintCopy = {
  heading: 'Concept, design & development',
  sentenceBefore: 'This website was designed and developed by',
  sentenceAfter: ', a software company in Würzburg, Germany.',
  eyebrow: 'Built by',
} as const

/** Default role list for the card; override per project with the `roles` prop. */
export const defaultRoles: readonly ImprintRole[] = [
  { term: 'Concept', detail: 'UX & structure' },
  { term: 'Design', detail: 'Visual concept' },
  { term: 'Development', detail: 'Front end & back end' },
  { term: 'Operations', detail: 'Hosting & maintenance' },
]
