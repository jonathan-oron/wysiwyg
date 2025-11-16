import type { Meta, StoryObj } from '@storybook/react-vite'
import { Terminal } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { Label } from '../label/Label'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'terminal', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">CPU:</span>
            <span className="text-primary">45%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">RAM:</span>
            <span className="text-primary">8.2 GB / 16 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Disk:</span>
            <span className="text-primary">256 GB / 512 GB</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Terminal className="mr-2 h-4 w-4" />
          Open Terminal
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const TerminalVariant: Story = {
  render: () => (
    <Card variant="terminal" className="w-[350px]">
      <CardHeader>
        <CardTitle>terminal.exe</CardTitle>
        <CardDescription>Active session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 font-mono text-sm">
          <div className="text-terminal-green">$ whoami</div>
          <div className="text-terminal-gray-400">root</div>
          <div className="text-terminal-green">$ pwd</div>
          <div className="text-terminal-gray-400">/home/user/projects</div>
          <div className="text-terminal-green terminal-cursor">$ _</div>
        </div>
      </CardContent>
    </Card>
  ),
}

export const LoginForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="root" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Login</Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have new updates</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your system has been updated successfully. Please restart to apply changes.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Restart Now</Button>
      </CardFooter>
    </Card>
  ),
}

export const NoPadding: Story = {
  render: () => (
    <Card padding="none" className="w-[350px] overflow-hidden">
      <div className="bg-terminal-green h-32 flex items-center justify-center">
        <Terminal className="h-16 w-16 text-terminal-black" />
      </div>
      <div className="p-6">
        <CardTitle className="mb-2">Custom Layout</CardTitle>
        <CardDescription>
          This card uses no default padding for custom layouts
        </CardDescription>
      </div>
    </Card>
  ),
}
