# DesignVibe Design System

A dark, geeky, terminal-inspired design system built with React, TypeScript, Tailwind CSS, and Radix UI.

## Features

- 🎨 **DTCG-Compliant Design Tokens** - Industry-standard design token format
- ⚛️ **React Components** - Built with TypeScript and Radix UI primitives
- 🎭 **Terminal Aesthetic** - Dark, retro, unix terminal-inspired design
- 📚 **Storybook** - Interactive component documentation
- 🛠️ **Tailwind CSS** - Utility-first styling with custom configuration
- ♿ **Accessible** - Built on Radix UI for excellent accessibility

## Getting Started

### Installation

```bash
npm install
```

### Generate Design Tokens

Convert DTCG tokens to CSS variables:

```bash
npm run build-tokens
```

### Development

Start the development server:

```bash
npm run dev
```

### Storybook

View components in Storybook:

```bash
npm run storybook
```

## Design System Structure

```
src/
├── design-tokens/
│   ├── tokens.json          # DTCG-compliant design tokens
│   └── build-tokens.js      # Token converter script
├── styles/
│   ├── tokens.css           # Generated CSS variables
│   └── globals.css          # Global styles and utilities
├── components/
│   └── ui/
│       ├── button/          # Button component
│       ├── input/           # Input component
│       ├── card/            # Card component
│       ├── alert/           # Alert component
│       ├── badge/           # Badge component
│       ├── typography/      # Typography components
│       └── ...              # More components
└── lib/
    └── utils.ts             # Utility functions
```

## Component Categories

### Form Components
- **Button** - Primary action buttons with variants
- **Input** - Text input fields with terminal styling
- **Textarea** - Multi-line text input
- **Select** - Dropdown select component
- **Checkbox** - Checkbox input with Radix UI
- **Radio** - Radio button groups
- **Label** - Form labels with required indicator

### Typography Components
- **Heading** - H1-H6 headings with glow and gradient options
- **Text** - Body text with size and weight variants
- **Code** - Inline and block code display
- **Link** - Hyperlinks with underline animation

### Layout Components
- **Card** - Container with header, content, and footer
- **Container** - Max-width container with padding options
- **Divider** - Horizontal and vertical dividers
- **Spacer** - Flexible spacing component

### Feedback Components
- **Alert** - Alert messages with variants
- **Badge** - Status badges and labels
- **Loading** - Spinner and skeleton loaders
- **Toast** - Toast notifications
- **Icon** - Icon wrapper for Lucide icons

## Design Tokens

The design system uses DTCG-compliant design tokens defined in `src/design-tokens/tokens.json`.

Token categories:
- **Colors** - Terminal-inspired color palette (greens, cyans, ambers)
- **Typography** - Font families, sizes, weights, line heights
- **Spacing** - Consistent spacing scale
- **Radius** - Border radius values
- **Shadows** - Box shadows and glow effects
- **Transitions** - Animation durations and timing functions

## Terminal Aesthetic

The design system features a dark, retro terminal aesthetic:

- **Primary Color**: Phosphor green (#00FF41)
- **Accent Colors**: Cyan, amber, purple
- **Background**: Deep black (#0a0e14)
- **Typography**: Mixed approach - monospace for code/technical elements, sans-serif for body
- **Effects**: Glow shadows, scanline overlays, cursor animations

## Usage Example

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
} from '@/components/ui'

function LoginCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Terminal Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="root" />
          </div>
          <Button className="w-full">Execute Login</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Customization

### Modifying Design Tokens

1. Edit `src/design-tokens/tokens.json`
2. Run `npm run build-tokens` to generate CSS variables
3. The changes will be reflected throughout the design system

### Adding New Components

1. Create component directory in `src/components/ui/[component-name]/`
2. Create component file with TypeScript
3. Add Storybook story file
4. Add README documentation
5. Export from `src/components/ui/index.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
