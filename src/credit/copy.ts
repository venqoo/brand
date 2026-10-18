import { VENQOO } from '../venqoo.js'

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

/** Languages the imprint credit is written in. */
export type ImprintLang = 'en' | 'de'

export interface ImprintRole {
  /** What venqoo was responsible for, e.g. "Development". */
  term: string
  /** The specifics, e.g. "Front end & back end". */
  detail: string
}

interface ImprintCopy {
  heading: string
  sentenceBefore: string
  sentenceAfter: string
  eyebrow: string
  country: string
  roles: readonly ImprintRole[]
}

export const imprintCopy: Record<ImprintLang, ImprintCopy> = {
  en: {
    heading: 'Concept, design & development',
    sentenceBefore: 'This website was designed and developed by',
    sentenceAfter: ', a software company in Würzburg, Germany.',
    eyebrow: 'Built by',
    country: 'Germany',
    roles: [
      { term: 'Concept', detail: 'UX & structure' },
      { term: 'Design', detail: 'Visual concept' },
      { term: 'Development', detail: 'Front end & back end' },
      { term: 'Operations', detail: 'Hosting & maintenance' },
    ],
  },
  de: {
    heading: 'Konzept, Design & Entwicklung',
    sentenceBefore: 'Diese Website wurde von der',
    sentenceAfter: ', einem Softwareunternehmen aus Würzburg, gestaltet und entwickelt.',
    eyebrow: 'Umgesetzt von',
    country: 'Deutschland',
    roles: [
      { term: 'Konzept', detail: 'UX & Struktur' },
      { term: 'Design', detail: 'Visuelles Konzept' },
      { term: 'Entwicklung', detail: 'Frontend & Backend' },
      { term: 'Betrieb', detail: 'Hosting & Wartung' },
    ],
  },
}

/** Default role list for the card, per language; override per project with the `roles` prop. */
export const imprintRoles: Record<ImprintLang, readonly ImprintRole[]> = {
  en: imprintCopy.en.roles,
  de: imprintCopy.de.roles,
}

/** The English default role list. */
export const defaultRoles: readonly ImprintRole[] = imprintRoles.en
