import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import '../../credit.css'
import { Credit, type CreditVariant } from './credit.js'
import type { CreditTheme } from './types.js'

const footerVariants: CreditVariant[] = ['heart', 'mark', 'pill', 'pill-signal']

// A client site's footer legal bar with its own font and colours, so the stories show
// what the credit inherits from the host rather than from the venqoo Storybook theme.
const host = {
  light: { background: '#fefcfa', color: '#6e645b', borderColor: '#ece4da' },
  dark: { background: '#0c0a09', color: '#a89f96', borderColor: '#282220' },
}

function FooterBar({ theme, children }: { theme: CreditTheme; children: ReactNode }) {
  return (
    <div
      style={{
        ...host[theme === 'dark' ? 'dark' : 'light'],
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem 2rem',
        padding: '1.25rem 2rem',
        borderTop: '1px solid',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '0.8125rem',
      }}
    >
      <span>© 2026 Bäckerei Muster GmbH · Impressum · Datenschutz</span>
      {children}
    </div>
  )
}

// Stories that draw their own footer bars opt out with `parameters: { footerBar: false }`.
const inFooter: Decorator = (Story, { args, parameters }) =>
  parameters.footerBar === false ? (
    <Story />
  ) : (
    <FooterBar theme={(args as { theme?: CreditTheme }).theme ?? 'light'}>
      <Story />
    </FooterBar>
  )

const meta = {
  title: 'Credit/Footer',
  component: Credit,
  decorators: [inFooter],
  parameters: { layout: 'fullscreen' },
  args: { variant: 'heart', theme: 'light' },
  argTypes: {
    variant: { control: 'inline-radio', options: footerVariants },
    theme: { control: 'inline-radio', options: ['light', 'dark', 'auto'] },
  },
} satisfies Meta<typeof Credit>

export default meta
type Story = StoryObj<typeof meta>

export const Heart: Story = {}
export const Mark: Story = { args: { variant: 'mark' } }
export const Pill: Story = { args: { variant: 'pill' } }
export const PillSignal: Story = { args: { variant: 'pill-signal' } }
export const Dark: Story = { args: { variant: 'mark', theme: 'dark' } }

function AllVariants({ theme }: { theme: CreditTheme }) {
  return (
    <div style={{ display: 'grid' }}>
      {footerVariants.map((variant) => (
        <FooterBar key={variant} theme={theme}>
          <Credit variant={variant} theme={theme} />
        </FooterBar>
      ))}
    </div>
  )
}

export const AllLight: Story = {
  parameters: { footerBar: false, controls: { disable: true } },
  render: () => <AllVariants theme="light" />,
}
export const AllDark: Story = {
  parameters: { footerBar: false, controls: { disable: true } },
  render: () => <AllVariants theme="dark" />,
}
