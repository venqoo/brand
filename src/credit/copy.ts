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

/** What the imprint credit says venqoo made: a website (default) or an app. */
export type ImprintSubject = 'website' | 'app'

export interface ImprintRole {
  /** What venqoo was responsible for, e.g. "Development". */
  term: string
  /** The specifics, e.g. "Front end & back end". */
  detail: string
}

interface ImprintCopy {
  heading: string
  /** "This website" / "This app" — the sentence's subject. */
  subject: Record<ImprintSubject, string>
  /** Between the subject and the linked name "venqoo". */
  sentenceBefore: string
  /** After the linked name, including the full stop. */
  sentenceAfter: string
  /** Second sentence: what venqoo GmbH does. */
  about: string
  eyebrow: string
  country: string
  roles: readonly ImprintRole[]
}

export const imprintCopy: Record<ImprintLang, ImprintCopy> = {
  en: {
    heading: 'Concept, design & development',
    subject: { website: 'This website', app: 'This app' },
    sentenceBefore: 'was designed and developed by',
    sentenceAfter: ', a software agency in Würzburg, Germany.',
    about:
      'venqoo GmbH builds apps, websites and custom software and advises companies on AI strategy and AI integration.',
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
    subject: { website: 'Diese Website', app: 'Diese App' },
    sentenceBefore: 'wurde von',
    sentenceAfter: ', einer Software-Agentur aus Würzburg, gestaltet und entwickelt.',
    about:
      'Die venqoo GmbH entwickelt Apps, Websites und individuelle Software und berät Unternehmen zu KI-Strategie und KI-Integration.',
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
