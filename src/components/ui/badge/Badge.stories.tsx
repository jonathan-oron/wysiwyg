import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'error', 'info', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Online',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Inactive',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Active',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Draft',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Server:</span>
        <Badge variant="success">Running</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Database:</span>
        <Badge variant="success">Connected</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">API:</span>
        <Badge variant="warning">Slow</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Cache:</span>
        <Badge variant="error">Offline</Badge>
      </div>
    </div>
  ),
}

export const WithCounts: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="info">Notifications: 3</Badge>
      <Badge variant="error">Errors: 12</Badge>
      <Badge variant="success">Tasks: 47</Badge>
    </div>
  ),
}
