import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import '../styles.css'
import { ImprintCredit } from './imprint.js'
import type { CreditTheme } from './types.js'

// A client's Impressum page with its own font, colours and heading styles. The credit
// closes the page after the client's own sections, which is where it sits on a real site.
// Headings are styled by element selectors, as on a real site, so the credit's heading
// can be seen picking them up.
const hostCss = `
  .demo-legal-notice { background: #fefcfa; color: #211b16; --demo-accent: #7a3e12; }
  .demo-legal-notice[data-theme="dark"] { background: #0c0a09; color: #f4efe9; --demo-accent: #e8b98f; }
  :where(.demo-legal-notice) h1 { margin: 0 0 1.5rem; font-size: 1.75rem; }
  :where(.demo-legal-notice) :is(h2, h3, h4) { font-size: 1.25rem; font-weight: 700; color: var(--demo-accent); }
  :where(.demo-legal-notice) p { margin: 0 0 0.5rem; }
`

function LegalNoticePage({ theme, children }: { theme: CreditTheme; children: ReactNode }) {
  return (
    <article
      className="demo-legal-notice"
      data-theme={theme === 'dark' ? 'dark' : 'light'}
      lang="de"
      style={{
        maxWidth: '42rem',
        padding: '2.5rem 2rem',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      }}
    >
      <style>{hostCss}</style>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Bäckerei Muster GmbH
        <br />
        Musterstraße 1, 12345 Musterstadt
      </p>
      <h2>Kontakt</h2>
      <p style={{ marginBottom: '2rem' }}>info@baeckerei-muster.example</p>
      {children}
    </article>
  )
}

const onLegalNotice: Decorator = (Story, { args }) => (
  <LegalNoticePage theme={(args as { theme?: CreditTheme }).theme ?? 'light'}>
    <Story />
  </LegalNoticePage>
)

const meta = {
  title: 'Credit/Imprint',
  component: ImprintCredit,
  decorators: [onLegalNotice],
  parameters: { layout: 'fullscreen' },
  args: { variant: 'section', theme: 'light', headingLevel: 2 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['section', 'card'] },
    theme: { control: 'inline-radio', options: ['light', 'dark', 'auto'] },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4] },
  },
} satisfies Meta<typeof ImprintCredit>

export default meta
type Story = StoryObj<typeof meta>

export const Section: Story = {}

export const SectionCustomText: Story = {
  args: { children: 'Relaunch, hosting and maintenance by venqoo GmbH.' },
}

export const Card: Story = { args: { variant: 'card' } }

export const CardCustomRoles: Story = {
  args: {
    variant: 'card',
    roles: [
      { term: 'App', detail: 'iOS & Android' },
      { term: 'Backend', detail: 'API & integrations' },
    ],
  },
}

export const CardDark: Story = { args: { variant: 'card', theme: 'dark' } }
