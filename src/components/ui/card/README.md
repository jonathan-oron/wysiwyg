# Card

A terminal-styled container component with header, content, and footer sections.

## Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui'

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

## Variants

### Default
Standard card with border and background.

```tsx
<Card>
  <CardContent>Content</CardContent>
</Card>
```

### Terminal
Card with terminal styling and green glow effect.

```tsx
<Card variant="terminal">
  <CardHeader>
    <CardTitle>terminal.exe</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="font-mono text-terminal-green">
      $ whoami
    </div>
  </CardContent>
</Card>
```

### Elevated
Card with enhanced shadow for elevated surfaces.

```tsx
<Card variant="elevated">
  <CardContent>Elevated card</CardContent>
</Card>
```

## Padding Options

Control the card's internal padding:

```tsx
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="default">Default padding</Card>
<Card padding="lg">Large padding</Card>
```

## Composition

### Card
The root container component.

```tsx
<Card className="w-[350px]">
  {/* Card content */}
</Card>
```

### CardHeader
Container for card title and description. Includes bottom border.

```tsx
<CardHeader>
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>
```

### CardTitle
The card's main heading (renders as `<h3>`).

```tsx
<CardTitle>System Status</CardTitle>
```

### CardDescription
Secondary text below the title.

```tsx
<CardDescription>Current system information</CardDescription>
```

### CardContent
Main content area of the card.

```tsx
<CardContent>
  <p>Your content here</p>
</CardContent>
```

### CardFooter
Footer area with top border, typically for actions.

```tsx
<CardFooter>
  <Button>Action</Button>
</CardFooter>
```

## Examples

### Login Form Card

```tsx
<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>Enter your credentials</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="root" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Login</Button>
  </CardFooter>
</Card>
```

### Terminal Output Card

```tsx
<Card variant="terminal" className="w-[400px]">
  <CardHeader>
    <CardTitle>bash</CardTitle>
    <CardDescription>Active session</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="font-mono text-sm space-y-1">
      <div className="text-terminal-green">$ ls -la</div>
      <div className="text-terminal-gray-400">drwxr-xr-x 12 user staff</div>
      <div className="text-terminal-green terminal-cursor">$ _</div>
    </div>
  </CardContent>
</Card>
```

### Stats Card

```tsx
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>System Resources</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-2 font-mono text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">CPU:</span>
        <span className="text-primary">45%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">RAM:</span>
        <span className="text-primary">8.2 GB</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Disk:</span>
        <span className="text-primary">256 GB</span>
      </div>
    </div>
  </CardContent>
</Card>
```

## Props

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'terminal' \| 'elevated'` | `'default'` | Card style variant |
| `padding` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Internal padding |

Plus all standard HTML div attributes.

### CardHeader, CardContent, CardFooter
All accept standard HTML div attributes.

### CardTitle
Accepts standard HTML heading attributes.

### CardDescription
Accepts standard HTML paragraph attributes.

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy with CardTitle
- Color contrast meets WCAG AA standards

## Terminal Styling

- Terminal variant includes green border and glow effect
- CardTitle uses monospace font with primary color
- Pairs well with terminal-themed content
- Supports scanline and CRT effects when combined with utility classes
