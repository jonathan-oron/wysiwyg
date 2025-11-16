import type { Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: {
          name: 'dark',
          value: '#0a0e14',
        },

        light: {
          name: 'light',
          value: '#ffffff',
        }
      }
    },
  },

  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground p-8">
        <Story />
      </div>
    ),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  }
}

export default preview
