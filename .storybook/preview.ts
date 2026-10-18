import type { Preview } from '@storybook/react-vite'

// The stories bring their own host-site chrome, so the preview stays neutral:
// no venqoo fonts or tokens, nothing the component could accidentally inherit.
const preview: Preview = {
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
}

export default preview
