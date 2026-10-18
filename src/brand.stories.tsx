import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles.css'
import { colors } from './colors.js'
import { Logo, UfoMark } from './marks.js'

const meta = {
  title: 'Brand',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const panel = (scheme: 'light' | 'dark') => ({
  padding: 32,
  background: colors[scheme].page,
  color: colors[scheme].text,
  fontFamily: 'Archivo, system-ui, sans-serif',
})

export const LogoStory: Story = {
  name: 'Logo',
  render: () => (
    <div style={{ display: 'grid', gap: 1 }}>
      {(['light', 'dark'] as const).map((scheme) => (
        <div className={scheme} key={scheme} style={panel(scheme)}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 48 }}>
            <Logo style={{ fontSize: 48 }} />
            <Logo style={{ fontSize: 24 }} />
            <Logo style={{ fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 32, color: colors[scheme].text }}>
            <UfoMark style={{ height: 48 }} />
            <UfoMark style={{ height: 48, color: colors[scheme].signal }} />
            <UfoMark style={{ height: 48, color: colors[scheme].muted }} />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 1 }}>
      {(['light', 'dark'] as const).map((scheme) => (
        <div key={scheme} style={panel(scheme)}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 16,
            }}
          >
            {Object.entries(colors[scheme]).map(([name, hex]) => (
              <div key={name} style={{ fontSize: 13 }}>
                <div
                  style={{
                    height: 56,
                    borderRadius: 8,
                    background: hex,
                    border: `1px solid ${colors[scheme].line}`,
                  }}
                />
                <div style={{ marginTop: 6, fontWeight: 500 }}>{name}</div>
                <div style={{ color: colors[scheme].muted }}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
