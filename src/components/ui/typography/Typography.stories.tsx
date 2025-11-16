import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from './Heading'
import { Text } from './Text'
import { Code } from './Code'
import { Link } from './Link'

const meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Heading level="h1">Heading 1 - Terminal Design</Heading>
      <Heading level="h2">Heading 2 - System Status</Heading>
      <Heading level="h3">Heading 3 - Process Monitor</Heading>
      <Heading level="h4">Heading 4 - Command Output</Heading>
      <Heading level="h5">Heading 5 - Log Entry</Heading>
      <Heading level="h6">Heading 6 - Debug Info</Heading>
    </div>
  ),
}

export const HeadingWithGradient: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Heading level="h1" gradient>
        Gradient Terminal Heading
      </Heading>
      <Heading level="h2" gradient>
        Cyberpunk Aesthetic
      </Heading>
    </div>
  ),
}

export const HeadingWithGlow: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Heading level="h1" glow>
        Glowing Terminal Text
      </Heading>
      <Heading level="h2" glow>
        Retro CRT Effect
      </Heading>
    </div>
  ),
}

export const TextVariants: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Text size="xs">Extra small text - Status message</Text>
      <Text size="sm">Small text - Helper text</Text>
      <Text size="base">Base text - Body content</Text>
      <Text size="lg">Large text - Emphasized content</Text>
      <Text size="xl">Extra large text - Subheading</Text>
    </div>
  ),
}

export const TextWeights: StoryObj = {
  render: () => (
    <div className="space-y-2 w-[600px]">
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
}

export const TextMuted: StoryObj = {
  render: () => (
    <div className="space-y-2 w-[600px]">
      <Text>Regular foreground color</Text>
      <Text muted>Muted text for secondary information</Text>
    </div>
  ),
}

export const TextMonospace: StoryObj = {
  render: () => (
    <div className="space-y-2 w-[600px]">
      <Text>Sans-serif text for body content</Text>
      <Text mono>Monospace text for technical content: npm install</Text>
    </div>
  ),
}

export const CodeVariants: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <div>
        <Text className="mb-2">Default code:</Text>
        <Code>npm install designvibe</Code>
      </div>
      <div>
        <Text className="mb-2">Inline code:</Text>
        <Text>
          Use the <Code variant="inline">useState</Code> hook to manage state.
        </Text>
      </div>
      <div>
        <Text className="mb-2">Block code:</Text>
        <Code variant="block">{`function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`}</Code>
      </div>
    </div>
  ),
}

export const Links: StoryObj = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <div>
        <Text className="mb-2">Default link:</Text>
        <Link href="#">Documentation</Link>
      </div>
      <div>
        <Text className="mb-2">Subtle link:</Text>
        <Link variant="subtle" href="#">
          Learn more
        </Link>
      </div>
      <div>
        <Text className="mb-2">Ghost link:</Text>
        <Link variant="ghost" href="#">
          Additional resources
        </Link>
      </div>
      <div>
        <Text className="mb-2">External link:</Text>
        <Link external href="https://example.com">
          External documentation
        </Link>
      </div>
    </div>
  ),
}

export const CombinedExample: StoryObj = {
  render: () => (
    <div className="space-y-6 w-[600px]">
      <div>
        <Heading level="h2" className="mb-2">
          Terminal Design System
        </Heading>
        <Text muted>A dark, geeky design system inspired by unix terminals</Text>
      </div>
      <div className="space-y-2">
        <Text>
          To install the package, run{' '}
          <Code variant="inline">npm install @designvibe/ui</Code> in your
          terminal.
        </Text>
        <Text>
          For more information, check out the{' '}
          <Link href="#">documentation</Link> or visit our{' '}
          <Link external href="https://github.com">
            GitHub repository
          </Link>
          .
        </Text>
      </div>
      <Code variant="block">{`import { Button, Card } from '@designvibe/ui'

function App() {
  return (
    <Card>
      <Button>Execute Command</Button>
    </Card>
  )
}`}</Code>
    </div>
  ),
}
