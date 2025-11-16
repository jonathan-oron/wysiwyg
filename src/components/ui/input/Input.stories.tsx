import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'
import { Label } from '../label/Label'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter command...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Username</Label>
      <Input id="email" placeholder="root@localhost" />
    </div>
  ),
}

export const WithRequiredLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password" required>
        Password
      </Label>
      <Input id="password" type="password" placeholder="••••••••" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'sudo rm -rf /',
  },
}

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file">Upload File</Label>
      <Input id="file" type="file" />
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid items-center gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Text input" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="email-type">Email</Label>
        <Input id="email-type" type="email" placeholder="email@example.com" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="password-type">Password</Label>
        <Input id="password-type" type="password" placeholder="Password" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="42" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
}
