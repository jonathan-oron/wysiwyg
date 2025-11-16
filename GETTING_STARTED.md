# Getting Started with DesignVibe

Quick start guide to using the DesignVibe terminal-inspired design system.

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons
- Storybook

### 2. Generate Design Tokens

Convert the DTCG design tokens to CSS variables:

```bash
npm run build-tokens
```

This reads `src/design-tokens/tokens.json` and generates `src/styles/tokens.css`.

### 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:5173 to view your app.

### 4. View Storybook

```bash
npm run storybook
```

Open http://localhost:6006 to explore all components interactively.

## Quick Component Examples

### Basic Button

```tsx
import { Button } from '@/components/ui'

<Button>Execute Command</Button>
```

### Form with Input

```tsx
import { Input, Label, Button } from '@/components/ui'

<div className="space-y-4">
  <div>
    <Label htmlFor="username">Username</Label>
    <Input id="username" placeholder="root" />
  </div>
  <Button>Login</Button>
</div>
```

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Terminal Status</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="font-mono text-primary">System online</p>
  </CardContent>
</Card>
```

### Alert Message

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui'
import { Terminal } from 'lucide-react'

<Alert variant="success">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Command executed successfully</AlertDescription>
</Alert>
```

## Terminal Aesthetic Tips

### Using Terminal Colors

```tsx
<div className="text-terminal-green">Success message</div>
<div className="text-terminal-amber">Warning message</div>
<div className="text-terminal-cyan">Info message</div>
<div className="text-terminal-red">Error message</div>
```

### Monospace Font

```tsx
<p className="font-mono">Terminal text: npm install</p>
```

### Glow Effects

```tsx
<Button className="shadow-glow-green">Glowing Button</Button>
<div className="text-primary terminal-glow">Glowing Text</div>
```

### Terminal Cursor

```tsx
<span className="terminal-cursor">_</span>
```

### Scanline Effect

```tsx
<div className="terminal-scanline p-8">
  Content with CRT scanline effect
</div>
```

## Building Components

### 1. Create Component Directory

```bash
src/components/ui/my-component/
├── MyComponent.tsx
├── MyComponent.stories.tsx
└── README.md
```

### 2. Use Design Tokens

Access tokens via CSS variables:

```tsx
// In your component
<div className="bg-background text-foreground border-border">
  Content
</div>
```

Or via Tailwind:

```tsx
<div className="bg-terminal-black text-terminal-green">
  Content
</div>
```

### 3. Follow Component Pattern

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const myComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'variant-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
MyComponent.displayName = 'MyComponent'
```

## Customizing the Design System

### Modify Design Tokens

1. Edit `src/design-tokens/tokens.json`
2. Update colors, spacing, typography, etc.
3. Run `npm run build-tokens`
4. Changes apply system-wide

Example - changing primary color:

```json
{
  "color": {
    "terminal": {
      "green": {
        "$value": "#00ff00", // Change this
        "$type": "color"
      }
    }
  }
}
```

### Extend Tailwind Config

Add custom utilities in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'my-custom-color': '#abc123',
    },
  },
}
```

## Project Structure

```
src/
├── components/ui/          # All design system components
│   ├── button/
│   ├── input/
│   ├── card/
│   └── ...
├── design-tokens/          # DTCG tokens and build script
│   ├── tokens.json
│   └── build-tokens.js
├── styles/                 # Global styles
│   ├── tokens.css          # Generated CSS variables
│   └── globals.css         # Global styles
└── lib/                    # Utilities
    └── utils.ts            # Helper functions
```

## Next Steps

1. ✅ Explore components in Storybook
2. ✅ Read component documentation in README files
3. ✅ Check out design tokens in `tokens.json`
4. ✅ Build your pages using the design system components
5. ✅ Customize tokens to match your brand

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [DTCG Specification](https://design-tokens.github.io/community-group/format/)
- [Lucide Icons](https://lucide.dev/)

## Need Help?

- Check the component README files in `src/components/ui/[component]/README.md`
- View examples in Storybook
- Review the main README.md for overview

Happy coding! 🚀
