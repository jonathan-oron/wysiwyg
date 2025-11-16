# Button

A terminal-styled button component with multiple variants and sizes.

## Usage

```tsx
import { Button } from '@/components/ui'

function Example() {
  return <Button>Execute Command</Button>
}
```

## Variants

### Default (Primary)
The primary action button with green terminal glow effect.

```tsx
<Button>Execute Command</Button>
<Button variant="default">Execute Command</Button>
```

### Destructive
For destructive or dangerous actions.

```tsx
<Button variant="destructive">Delete File</Button>
```

### Outline
A button with transparent background and border.

```tsx
<Button variant="outline">Cancel</Button>
```

### Secondary
For secondary actions.

```tsx
<Button variant="secondary">View Details</Button>
```

### Ghost
A subtle button without background or border.

```tsx
<Button variant="ghost">Settings</Button>
```

### Link
Styled as a hyperlink.

```tsx
<Button variant="link">Learn More</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon icon={Terminal} />
</Button>
```

## With Icons

```tsx
import { Terminal } from 'lucide-react'

<Button>
  <Terminal className="mr-2 h-4 w-4" />
  Open Terminal
</Button>
```

## Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

## As Child (Polymorphic)

Use the `asChild` prop to render the button as a different element:

```tsx
<Button asChild>
  <a href="/terminal">Open Terminal</a>
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render as child element |
| `disabled` | `boolean` | `false` | Disabled state |

Plus all standard HTML button attributes.

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Enter/Space)
- Includes focus-visible ring for keyboard users
- Disabled buttons have `disabled` attribute and reduced opacity

## Terminal Styling

The button includes terminal-specific features:
- Uppercase tracking for a command-line feel
- Monospace font
- Green glow effect on primary variant
- Border styling for terminal aesthetic
