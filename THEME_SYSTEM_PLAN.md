# Runtime Theme Replacement System - Implementation Plan

## Table of Contents
- [Overview](#overview)
- [Current State Analysis](#current-state-analysis)
- [Proposed Architecture](#proposed-architecture)
- [Implementation Plan](#implementation-plan)
- [Technical Specifications](#technical-specifications)
- [Key Considerations](#key-considerations)
- [Success Metrics](#success-metrics)
- [Timeline & Next Steps](#timeline--next-steps)

---

## Overview

This document outlines the comprehensive plan to build a runtime theme replacement system for the WYSIWYG editor application. The system will enable users to switch between multiple pre-built themes and create custom themes without rebuilding the application.

**Goals:**
- Enable runtime theme switching without page reload
- Support multiple pre-built themes (dark/light variants)
- Provide custom theme builder for user personalization
- Maintain backward compatibility with existing components
- Ensure WCAG AA accessibility compliance across all themes
- Achieve sub-100ms theme switch performance

---

## Current State Analysis

### Existing Architecture

**Design Token System:**
- DTCG-compliant token structure in `src/design-tokens/tokens.json`
- Build-time CSS variable generation via `build-tokens.js`
- Output: `src/styles/tokens.css` with `:root` scoped variables
- 95 CSS custom properties covering colors, typography, spacing, shadows, etc.

**Current Theme:**
- Single theme: "DesignVibe" - Terminal-inspired dark theme
- Base colors: Dark navy background (`#0a0e14`), neon green primary (`#00ff41`)
- Terminal aesthetic: Monospace fonts, glow effects, scanline animations

**Technology Stack:**
- React 18.2 + TypeScript 5.2
- Tailwind CSS 3.4 configured to reference CSS variables
- Zustand 5.0.8 for state management (already in use)
- Radix UI primitives with 31 shadcn/ui-style components
- Vite 5.0.8 build system

**Limitations:**
- No runtime theme switching capability
- Theme changes require rebuild and redeployment
- Single dark theme only
- No user customization options

---

## Proposed Architecture

### 1. Multi-Theme Token System

**New Structure:**
```
src/design-tokens/
├── base-tokens.json          # NEW: Universal tokens (spacing, typography, etc.)
├── themes/                   # NEW: Theme-specific token files
│   ├── terminal-dark.json    # Current theme
│   ├── terminal-light.json   # Light variant
│   ├── ocean-dark.json       # Alternative dark theme
│   ├── ocean-light.json      # Alternative light theme
│   └── custom.json           # User-customizable template
├── build-tokens.js           # MODIFIED: Multi-theme processor
├── generate-theme-types.js   # NEW: TypeScript type generator
└── theme-schema.json         # NEW: JSON schema for validation
```

**Design Principles:**
- **Base Tokens:** Universal values (spacing, typography, border radius) - theme-independent
- **Theme Tokens:** Color palettes and color-dependent values (shadows with color)
- **Semantic Layer:** Consistent semantic token names across all themes
- **DTCG Compliance:** Maintain Design Token Community Group standard

**Theme File Structure:**
```json
{
  "$schema": "../theme-schema.json",
  "meta": {
    "id": "terminal-dark",
    "name": "Terminal Dark",
    "description": "Cyberpunk terminal aesthetic",
    "category": "dark",
    "author": "DesignVibe",
    "version": "1.0.0"
  },
  "color": {
    "palette": {
      "surface": {
        "base": { "$value": "#0a0e14" },
        "elevated": { "$value": "#151a21" }
      },
      "brand": {
        "primary": { "$value": "#00ff41" },
        "primary-hover": { "$value": "#00cc34" }
      },
      "accent": {
        "primary": { "$value": "#00e5ff" },
        "secondary": { "$value": "#c792ea" }
      },
      "feedback": {
        "error": { "$value": "#ff3333" },
        "warning": { "$value": "#ffb000" },
        "info": { "$value": "#5ccfe6" }
      },
      "neutral": { /* 50-900 scale */ }
    },
    "semantic": {
      "background": { "$value": "{color.palette.surface.base}" },
      "foreground": { "$value": "{color.palette.brand.primary}" },
      "primary": { "$value": "{color.palette.brand.primary}" },
      /* ... all semantic tokens ... */
    }
  },
  "shadow": {
    "focus": {
      "$value": {
        "offsetX": "0",
        "offsetY": "0",
        "blur": "10px",
        "spread": "0",
        "color": "rgba(0, 255, 65, 0.3)"
      }
    }
  }
}
```

---

### 2. Enhanced Build System

**Modified `build-tokens.js` Workflow:**

```javascript
1. Read base-tokens.json (universal tokens)
2. Read all theme files from themes/ directory
3. Validate each theme against JSON schema
4. Generate CSS output:

   :root {
     /* Base tokens - spacing, typography, etc. */
     --spacing-4: 1rem;
     --font-family-sans: Inter, sans-serif;
     --radius-base: 0.25rem;
   }

   [data-theme="terminal-dark"] {
     /* Theme-specific color tokens */
     --color-semantic-primary: #00ff41;
     --color-semantic-background: #0a0e14;
     --shadow-focus: 0 0 10px 0 rgba(0, 255, 65, 0.3);
   }

   [data-theme="ocean-light"] {
     --color-semantic-primary: #0066cc;
     --color-semantic-background: #ffffff;
     --shadow-focus: 0 0 10px 0 rgba(0, 102, 204, 0.3);
   }

5. Generate TypeScript types (src/lib/theme-registry.ts)
6. Create theme metadata JSON for runtime imports
```

**New Script: `generate-theme-types.js`**
- Creates TypeScript interfaces from theme files
- Exports theme registry with metadata
- Validates all themes have required semantic tokens
- Generates type-safe theme utilities

**Output: `src/lib/theme-registry.ts`**
```typescript
export type ThemeId =
  | 'terminal-dark'
  | 'terminal-light'
  | 'ocean-dark'
  | 'ocean-light'
  | 'custom'

export interface ThemeMetadata {
  id: ThemeId
  name: string
  description: string
  category: 'light' | 'dark'
  author: string
  version: string
  preview: {
    primary: string
    background: string
    accent: string
  }
}

export const themes: Record<ThemeId, ThemeMetadata>
```

---

### 3. Runtime Theme System

#### 3.1 Theme Provider (React Context)

**File: `src/contexts/ThemeProvider.tsx`**

```typescript
interface ThemeContextValue {
  currentTheme: ThemeId
  setTheme: (id: ThemeId) => void
  themes: ThemeMetadata[]
  isCustomTheme: boolean
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const { currentTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Apply data-theme attribute to document element
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={...}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Features:**
- Applies `data-theme` attribute to `<html>` element
- Syncs with Zustand store for state persistence
- Handles theme hydration on initial load
- Provides theme context to all components

#### 3.2 Theme Store (Zustand)

**File: `src/store/themeStore.ts`**

```typescript
interface ThemeState {
  // Current active theme
  current: ThemeId

  // User preferences
  followSystem: boolean // Auto-switch based on prefers-color-scheme

  // Custom theme data
  customTheme: CustomTheme | null

  // Actions
  setTheme: (id: ThemeId) => void
  toggleTheme: () => void // Switch between light/dark variant of current theme
  setFollowSystem: (follow: boolean) => void
  saveCustomTheme: (theme: CustomTheme) => void
  deleteCustomTheme: () => void

  // Utilities
  getThemeMetadata: (id: ThemeId) => ThemeMetadata
  exportTheme: (id: ThemeId) => string // Export as JSON
  importTheme: (json: string) => Promise<void> // Import and validate
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      current: 'terminal-dark',
      followSystem: false,
      customTheme: null,

      setTheme: (id) => {
        set({ current: id })
        // Emit custom event for animations
        window.dispatchEvent(new CustomEvent('themechange', { detail: id }))
      },

      // ... other implementations
    }),
    {
      name: 'theme-preference',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

**Features:**
- Persistent theme preference via localStorage
- System theme detection with `prefers-color-scheme`
- Custom theme storage (max 5 themes due to localStorage limits)
- Theme change events for animations
- Import/export functionality

#### 3.3 Theme Utilities

**File: `src/lib/theme-utils.ts`**

```typescript
export function applyTheme(themeId: ThemeId): void {
  document.documentElement.setAttribute('data-theme', themeId)
}

export function getThemeColors(themeId: ThemeId): ThemeColorPalette {
  const theme = themes[themeId]
  return theme.preview
}

export function validateTheme(theme: unknown): theme is CustomTheme {
  // Validate against JSON schema
  // Ensure all required semantic tokens exist
  // Check color format validity
}

export function generateThemeCSS(theme: CustomTheme): string {
  // Generate CSS variable declarations from theme object
  // Used for dynamic custom theme injection
}

export async function detectSystemTheme(): Promise<'light' | 'dark'> {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function getThemeVariant(themeId: ThemeId, variant: 'light' | 'dark'): ThemeId {
  // e.g., terminal-dark + light = terminal-light
}
```

---

### 4. Runtime Theme Application Strategies

**Two Approaches (Recommended: Hybrid)**

#### Approach A: Data Attribute Scoping (Pre-built Themes)
**Pros:** Fast, no JavaScript required, cacheable CSS
**Cons:** Larger initial bundle, requires rebuild for new themes

```css
/* Generated CSS */
[data-theme="terminal-dark"] {
  --color-semantic-primary: #00ff41;
  --color-semantic-background: #0a0e14;
}

[data-theme="ocean-light"] {
  --color-semantic-primary: #0066cc;
  --color-semantic-background: #ffffff;
}
```

#### Approach B: Dynamic Style Injection (Custom Themes)
**Pros:** No rebuild needed, infinite themes possible
**Cons:** Slight delay on theme switch, requires JavaScript

```typescript
function injectCustomTheme(theme: CustomTheme) {
  const styleId = 'custom-theme-vars'
  let styleEl = document.getElementById(styleId)

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = styleId
    document.head.appendChild(styleEl)
  }

  styleEl.textContent = `
    [data-theme="custom"] {
      ${generateThemeCSS(theme)}
    }
  `
}
```

#### Recommended: Hybrid Approach
- **Pre-built themes:** Use data-attribute scoping (fast, included in bundle)
- **Custom themes:** Use dynamic injection (flexible, user-created)
- **Fallback:** Default to `terminal-dark` if theme not found or localStorage corrupted

---

### 5. UI Components

#### 5.1 ThemeToggle (Quick Switch)

**File: `src/components/ui/theme-toggle/ThemeToggle.tsx`**

```typescript
export function ThemeToggle() {
  const { currentTheme, setTheme } = useTheme()
  const isDark = currentTheme.includes('dark')

  const toggle = () => {
    const newTheme = isDark
      ? currentTheme.replace('-dark', '-light')
      : currentTheme.replace('-light', '-dark')
    setTheme(newTheme as ThemeId)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
```

#### 5.2 ThemeSwitcher (Full Selector)

**File: `src/components/ui/theme-switcher/ThemeSwitcher.tsx`**

```typescript
export function ThemeSwitcher({
  variant = 'dropdown',
  showCustomTheme = true
}: ThemeSwitcherProps) {
  const { currentTheme, setTheme, themes } = useTheme()

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Palette className="mr-2 h-4 w-4" />
            Theme
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={cn(currentTheme === theme.id && 'bg-accent')}
            >
              <ThemePreviewDot colors={theme.preview} />
              {theme.name}
              {currentTheme === theme.id && <Check className="ml-auto" />}
            </DropdownMenuItem>
          ))}
          {showCustomTheme && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openCustomizer}>
                <Settings className="mr-2 h-4 w-4" />
                Customize Theme
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Palette variant: Visual grid of theme previews
  return <ThemePaletteGrid themes={themes} />
}
```

#### 5.3 ThemeCustomizer (Advanced Editor)

**File: `src/components/ui/theme-customizer/ThemeCustomizer.tsx`**

```typescript
export function ThemeCustomizer({
  baseTheme = 'terminal-dark',
  onSave,
  onClose
}: ThemeCustomizerProps) {
  const [customColors, setCustomColors] = useState<CustomThemeColors>({
    primary: '#00ff41',
    background: '#0a0e14',
    accent: '#00e5ff',
    // ...
  })

  const [previewTheme, setPreviewTheme] = useState<CustomTheme>()

  const updateColor = (key: string, value: string) => {
    const updated = { ...customColors, [key]: value }
    setCustomColors(updated)

    // Generate derivative colors (hover states, etc.)
    const theme = generateThemeFromColors(updated, baseTheme)
    setPreviewTheme(theme)

    // Apply preview
    injectCustomTheme(theme)
  }

  return (
    <Dialog>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Color pickers */}
          <div className="space-y-4">
            <ColorPicker
              label="Primary Color"
              value={customColors.primary}
              onChange={(color) => updateColor('primary', color)}
            />
            <ColorPicker
              label="Background Color"
              value={customColors.background}
              onChange={(color) => updateColor('background', color)}
            />
            {/* ... more color pickers ... */}

            <ContrastChecker colors={customColors} />
          </div>

          {/* Right: Live preview */}
          <ThemePreview theme={previewTheme} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(previewTheme)}>Save Theme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

**Features:**
- Color picker integration (react-colorful)
- Live preview as colors change
- Auto-generate hover/active states (darken/lighten by 10-15%)
- Contrast ratio calculator (WCAG compliance checker)
- Generate complementary colors
- Base theme selection (start from existing theme)

#### 5.4 ThemePreview (Visual Display)

**File: `src/components/ui/theme-preview/ThemePreview.tsx`**

```typescript
export function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* Color palette */}
      <div>
        <Text variant="muted" size="sm">Color Palette</Text>
        <div className="mt-2 flex gap-2">
          <ColorSwatch color={theme.colors.primary} label="Primary" />
          <ColorSwatch color={theme.colors.background} label="Background" />
          <ColorSwatch color={theme.colors.accent} label="Accent" />
        </div>
      </div>

      {/* Sample UI components */}
      <div className="space-y-2">
        <Text variant="muted" size="sm">Preview</Text>
        <Button>Primary Button</Button>
        <Input placeholder="Input field" />
        <Badge>Badge</Badge>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Sample card content</CardContent>
        </Card>
      </div>
    </div>
  )
}
```

---

### 6. Theme Transitions

**Smooth Animations:**

**File: `src/styles/theme-transitions.css`**

```css
/* Transition theme-dependent properties */
:root {
  --theme-transition-duration: 300ms;
  --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  transition:
    background-color var(--theme-transition-duration) var(--theme-transition-timing),
    color var(--theme-transition-duration) var(--theme-transition-timing),
    border-color var(--theme-transition-duration) var(--theme-transition-timing),
    box-shadow var(--theme-transition-duration) var(--theme-transition-timing);
}

/* Disable transitions for reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0ms !important;
  }
}
```

**View Transition API (Progressive Enhancement):**

```typescript
// src/lib/theme-utils.ts
export function applyThemeWithTransition(themeId: ThemeId): void {
  // Modern browsers: Use View Transition API
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', themeId)
    })
  } else {
    // Fallback: Standard attribute change (CSS transitions apply)
    document.documentElement.setAttribute('data-theme', themeId)
  }
}
```

---

### 7. Custom Theme Features

#### 7.1 Color Generation Algorithm

```typescript
// Auto-generate derivative colors from primary palette
export function generateThemeFromColors(
  colors: CustomThemeColors,
  baseTheme: ThemeId
): CustomTheme {
  const { primary, background, accent } = colors

  return {
    meta: {
      id: 'custom',
      name: 'Custom Theme',
      category: isColorDark(background) ? 'dark' : 'light',
    },
    colors: {
      // User-provided
      primary,
      background,
      accent,

      // Auto-generated
      'primary-hover': adjustColor(primary, { darken: 0.15 }),
      'primary-foreground': getContrastingColor(primary),
      'background-elevated': adjustColor(background, { lighten: 0.05 }),
      'foreground': getContrastingColor(background),

      // Generate neutral scale from background
      ...generateNeutralScale(background),

      // Generate semantic tokens
      'border': generateNeutralScale(background)[700],
      'border-focus': primary,
      // ...
    },
    shadows: {
      focus: generateGlowShadow(primary),
      accent: generateGlowShadow(accent),
    }
  }
}
```

#### 7.2 Contrast Ratio Validation

```typescript
export function validateContrast(theme: CustomTheme): ValidationResult {
  const issues: ContrastIssue[] = []

  // Check WCAG AA compliance (4.5:1 for text, 3:1 for UI)
  const textContrast = getContrastRatio(
    theme.colors.foreground,
    theme.colors.background
  )

  if (textContrast < 4.5) {
    issues.push({
      severity: 'error',
      message: `Text contrast ${textContrast.toFixed(2)}:1 fails WCAG AA (requires 4.5:1)`,
      fix: 'Increase contrast between foreground and background colors'
    })
  }

  // Check all semantic color combinations
  // ...

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  }
}
```

#### 7.3 Import/Export

```typescript
// Export theme as JSON
export function exportTheme(themeId: ThemeId): string {
  const theme = themes[themeId]
  return JSON.stringify(theme, null, 2)
}

// Export as shareable URL
export function exportThemeURL(theme: CustomTheme): string {
  const encoded = btoa(JSON.stringify(theme))
  return `${window.location.origin}?theme=${encoded}`
}

// Import theme from JSON
export async function importTheme(json: string): Promise<CustomTheme> {
  try {
    const theme = JSON.parse(json)

    // Validate structure
    if (!validateTheme(theme)) {
      throw new Error('Invalid theme structure')
    }

    // Validate colors
    const validation = validateContrast(theme)
    if (!validation.valid) {
      console.warn('Theme has contrast issues:', validation.issues)
    }

    return theme
  } catch (error) {
    throw new Error('Failed to import theme: ' + error.message)
  }
}
```

---

## Implementation Plan

### Phase 1: Foundation (Week 1)

#### 1.1 Refactor Token Structure
**Tasks:**
- [ ] Create `src/design-tokens/base-tokens.json`
  - Move spacing, typography, border-radius, transitions from `tokens.json`
  - Keep universal, theme-independent values
- [ ] Create `src/design-tokens/themes/` directory
- [ ] Create `src/design-tokens/themes/terminal-dark.json`
  - Extract color palette and shadows from current `tokens.json`
  - Add theme metadata (id, name, description, category)
- [ ] Create `src/design-tokens/themes/terminal-light.json`
  - Inverted color scheme (light background, dark text)
  - Same terminal aesthetic, lighter palette
- [ ] Create `src/design-tokens/theme-schema.json`
  - JSON schema for theme validation
  - Define required/optional properties
  - Validate color formats, references

**Deliverables:**
- Separated base and theme tokens
- 2 initial themes (terminal-dark, terminal-light)
- JSON schema for validation

**Testing:**
- Verify `npm run build-tokens` still works (no breaking changes)
- Visual check: App looks identical with refactored tokens

---

#### 1.2 Enhanced Build System
**Tasks:**
- [ ] Update `src/design-tokens/build-tokens.js`
  - Read `base-tokens.json` and all files in `themes/`
  - Generate `:root` scope for base tokens
  - Generate `[data-theme="X"]` scopes for each theme
  - Validate themes against schema
  - Add error handling and logging
- [ ] Create `src/design-tokens/generate-theme-types.js`
  - Read theme metadata
  - Generate `ThemeId` union type
  - Generate `ThemeMetadata` interfaces
  - Generate `themes` registry object
  - Output to `src/lib/theme-registry.ts`
- [ ] Update `package.json` scripts
  ```json
  {
    "build-tokens": "node src/design-tokens/build-tokens.js",
    "generate-theme-types": "node src/design-tokens/generate-theme-types.js",
    "build-themes": "npm run build-tokens && npm run generate-theme-types"
  }
  ```

**Deliverables:**
- Multi-theme CSS output with data-attribute scoping
- Auto-generated TypeScript types
- Updated build scripts

**Testing:**
- Run `npm run build-themes` successfully
- Verify `tokens.css` has both `:root` and `[data-theme]` rules
- Check `theme-registry.ts` is generated correctly

---

#### 1.3 Theme Registry
**Tasks:**
- [ ] Create `src/lib/theme-registry.ts` (manual, then auto-generated)
  - Define `ThemeId` type
  - Define `ThemeMetadata` interface
  - Define `Theme` interface
  - Export `themes` object with all theme metadata
  - Export utility functions:
    - `getTheme(id: ThemeId): Theme`
    - `getThemesByCategory(category: 'light' | 'dark'): Theme[]`
    - `getDefaultTheme(): ThemeId`
- [ ] Create `src/lib/theme-utils.ts`
  - `applyTheme(themeId: ThemeId): void`
  - `detectSystemTheme(): Promise<'light' | 'dark'>`
  - `getThemeVariant(themeId, variant): ThemeId`
  - `validateTheme(theme: unknown): boolean`

**Deliverables:**
- Type-safe theme registry
- Theme utility functions

**Testing:**
- Unit tests for theme utilities
- Type checking passes

---

### Phase 2: Runtime System (Week 2)

#### 2.1 State Management
**Tasks:**
- [ ] Create `src/store/themeStore.ts`
  - Define `ThemeState` interface
  - Implement Zustand store with persist middleware
  - Actions: `setTheme`, `toggleTheme`, `setFollowSystem`
  - LocalStorage key: `theme-preference`
  - Default theme: `terminal-dark`
- [ ] Implement system theme detection
  - Listen to `prefers-color-scheme` media query
  - Auto-switch when `followSystem` is true
  - Handle media query changes (light ↔ dark)

**Deliverables:**
- Theme state store with persistence
- System theme detection

**Testing:**
- Theme preference persists across page reloads
- System theme detection works correctly
- Store actions update state as expected

---

#### 2.2 Theme Provider
**Tasks:**
- [ ] Create `src/contexts/ThemeProvider.tsx`
  - React Context with `ThemeContextValue`
  - Subscribe to theme store
  - Apply `data-theme` attribute to `document.documentElement`
  - Handle SSR safety (check for `document` before accessing)
  - Emit `themechange` custom event on theme switch
- [ ] Create `src/hooks/useTheme.ts`
  - Hook to access theme context
  - Returns: `{ currentTheme, setTheme, themes, isCustomTheme }`
- [ ] Integrate into `src/App.tsx`
  - Wrap app with `<ThemeProvider>`
  - Place above other providers

**Deliverables:**
- Theme provider and context
- Custom hook for theme access
- Integration into app

**Testing:**
- Theme changes apply to DOM
- Context is accessible in all components
- No hydration errors

---

#### 2.3 Theme Application
**Tasks:**
- [ ] Update `src/styles/globals.css`
  - Import `theme-transitions.css`
  - Add transitions to theme-dependent properties
  - Add `prefers-reduced-motion` media query
- [ ] Create `src/styles/theme-transitions.css`
  - Define transition rules
  - Handle reduced motion preference
- [ ] Implement theme change with View Transition API
  - Feature detection
  - Fallback for unsupported browsers
  - Smooth cross-fade effect

**Deliverables:**
- Smooth theme transitions
- Accessibility-compliant (reduced motion support)
- Progressive enhancement (View Transition API)

**Testing:**
- Theme switches smoothly in modern browsers
- Transitions disabled with `prefers-reduced-motion: reduce`
- No layout shift or flicker during transition

---

### Phase 3: UI Components (Week 3)

#### 3.1 Basic Theme Toggle
**Tasks:**
- [ ] Create `src/components/ui/theme-toggle/`
  - `ThemeToggle.tsx` - Simple sun/moon icon button
  - `ThemeToggle.stories.tsx` - Storybook story
  - Toggle between light/dark variant of current theme
  - Keyboard accessible
  - ARIA label for screen readers

**Deliverables:**
- ThemeToggle component
- Storybook documentation

**Testing:**
- Toggles between light/dark themes
- Keyboard navigation works (Enter/Space)
- Screen reader announces theme change

---

#### 3.2 Theme Switcher Dropdown
**Tasks:**
- [ ] Create `src/components/ui/theme-switcher/`
  - `ThemeSwitcher.tsx` - Dropdown menu with all themes
  - `ThemePreviewDot.tsx` - Small color preview dots
  - `ThemeSwitcher.stories.tsx` - Storybook story
  - Group themes by category (dark/light)
  - Show current theme with checkmark
  - "Customize Theme" option

**Deliverables:**
- ThemeSwitcher component with variants
- Theme preview indicators

**Testing:**
- All themes listed correctly
- Current theme is highlighted
- Switching works from dropdown

---

#### 3.3 Theme Preview
**Tasks:**
- [ ] Create `src/components/ui/theme-preview/`
  - `ThemePreview.tsx` - Visual theme preview
  - `ColorSwatch.tsx` - Individual color display
  - `ThemePreview.stories.tsx` - Storybook story
  - Show color palette
  - Show sample UI components in theme
  - Responsive layout

**Deliverables:**
- ThemePreview component
- ColorSwatch component

**Testing:**
- Preview accurately represents theme
- Responsive on mobile/desktop

---

#### 3.4 Integration
**Tasks:**
- [ ] Add ThemeToggle to main app toolbar
  - Top right corner of editor interface
  - Always visible
- [ ] Create user settings/preferences dialog (if not exists)
- [ ] Add ThemeSwitcher to settings dialog
  - Full theme selection
  - System theme option
- [ ] Update onboarding flow (if exists)
  - Ask for theme preference on first visit

**Deliverables:**
- Theme controls integrated into UI
- Settings dialog with theme options

**Testing:**
- Theme toggle accessible from all pages
- Settings dialog opens and works correctly
- Onboarding captures theme preference

---

### Phase 4: Advanced Features (Week 4)

#### 4.1 Custom Theme Builder
**Tasks:**
- [ ] Install dependencies
  ```bash
  npm install react-colorful tinycolor2 @types/tinycolor2
  ```
- [ ] Create `src/components/ui/theme-customizer/`
  - `ThemeCustomizer.tsx` - Main customizer dialog
  - `ColorPicker.tsx` - Color input with picker
  - `ContrastChecker.tsx` - WCAG compliance checker
  - `ThemeCustomizer.stories.tsx` - Storybook story
- [ ] Implement color generation utilities
  - `generateThemeFromColors()` - Auto-generate full theme
  - `adjustColor()` - Darken/lighten helpers
  - `getContrastingColor()` - Find readable text color
  - `generateNeutralScale()` - Create neutral palette from base
- [ ] Add live preview
  - Apply custom theme on-the-fly
  - Update preview panel in real-time
  - Show before/after comparison

**Deliverables:**
- ThemeCustomizer component
- Color generation utilities
- Live preview functionality

**Testing:**
- Color picker updates theme in real-time
- Generated colors meet contrast requirements
- Custom theme can be saved

---

#### 4.2 Theme Import/Export
**Tasks:**
- [ ] Implement export functions
  - `exportTheme(themeId)` - JSON export
  - `exportThemeURL(theme)` - Base64 encoded URL
  - Download JSON file
  - Copy to clipboard
- [ ] Implement import functions
  - `importTheme(json)` - Parse and validate
  - File upload
  - Paste JSON input
  - URL parameter parsing (`?theme=base64`)
- [ ] Add import/export UI to ThemeCustomizer
  - Export buttons (JSON, URL, Copy)
  - Import button with file picker
  - Import from URL on page load

**Deliverables:**
- Import/export functionality
- UI controls in customizer

**Testing:**
- Export creates valid JSON
- Import validates theme correctly
- URL sharing works across browsers
- Invalid themes show error messages

---

#### 4.3 Custom Theme Storage
**Tasks:**
- [ ] Extend `themeStore.ts`
  - `customTheme` state
  - `saveCustomTheme()` action
  - `deleteCustomTheme()` action
  - LocalStorage persistence (separate key: `custom-theme`)
- [ ] Implement dynamic style injection
  - `injectCustomTheme(theme)` - Create `<style>` element
  - `removeCustomTheme()` - Clean up injected styles
  - Apply on mount if custom theme is active
- [ ] Add custom theme to theme switcher
  - Show "Custom" option when custom theme exists
  - "Edit" button next to custom theme
  - "Delete" option

**Deliverables:**
- Custom theme persistence
- Dynamic style injection
- UI for managing custom theme

**Testing:**
- Custom theme persists across sessions
- Custom theme applies correctly
- Can switch between custom and pre-built themes
- Delete removes custom theme

---

#### 4.4 Transitions & Polish
**Tasks:**
- [ ] Implement View Transition API
  - Feature detection
  - Cross-fade animation
  - Fallback for unsupported browsers
- [ ] Add loading states
  - Skeleton loader during theme generation
  - Progress indicator for import
- [ ] Optimize performance
  - Debounce color picker updates
  - Memoize theme generation
  - Lazy load ThemeCustomizer component
- [ ] Accessibility improvements
  - Focus management in dialogs
  - Keyboard shortcuts for theme toggle
  - Screen reader announcements

**Deliverables:**
- Smooth animations
- Loading states
- Performance optimizations
- Accessibility enhancements

**Testing:**
- Transitions smooth on all browsers
- No jank during theme switch
- Loading states appear when needed
- Keyboard navigation works throughout

---

### Phase 5: Additional Themes (Week 5)

#### 5.1 Create Theme Variants
**Tasks:**
- [ ] Create `ocean-dark.json`
  - Blue/teal color scheme
  - Dark navy background
  - Ocean-inspired palette
- [ ] Create `ocean-light.json`
  - Light blue/white color scheme
  - Clean, professional look
- [ ] Create `forest-dark.json`
  - Green/earth tone palette
  - Alternative to terminal green
- [ ] Create `sunset-light.json`
  - Warm orange/pink tones
  - Light background
- [ ] Create `high-contrast-dark.json`
  - Maximum contrast for accessibility
  - Pure black background, white text
  - Bright accent colors
- [ ] Create `high-contrast-light.json`
  - Maximum contrast light theme
  - Pure white background, black text

**Deliverables:**
- 6 new themes (8 total including terminal variants)
- Diverse color palettes
- Light and dark options for each family

---

#### 5.2 Theme Testing
**Tasks:**
- [ ] Visual testing with all 31 components
  - Test each component with each theme
  - Check for readability issues
  - Verify hover/focus states
  - Check disabled states
- [ ] Contrast ratio validation
  - Run automated contrast checks
  - Verify WCAG AA compliance (4.5:1 text, 3:1 UI)
  - Document any exceptions
- [ ] Focus indicator testing
  - Ensure focus rings visible in all themes
  - Check keyboard navigation clarity
- [ ] Screen reader testing
  - Test theme switcher with NVDA/JAWS
  - Verify theme change announcements
  - Check color descriptions
- [ ] Cross-browser testing
  - Chrome, Firefox, Safari, Edge
  - Test theme switching
  - Test custom theme builder
  - Verify transitions

**Deliverables:**
- Component compatibility matrix
- Accessibility audit report
- Browser compatibility report

---

### Phase 6: Documentation & Polish (Week 6)

#### 6.1 Documentation
**Tasks:**
- [ ] Create `docs/THEME_SYSTEM.md`
  - Architecture overview
  - How to create a new theme
  - Token structure documentation
  - API reference
- [ ] Update `README.md`
  - Add theme system section
  - Link to theme docs
  - Screenshots of different themes
- [ ] Create theme creation guide
  - Step-by-step tutorial
  - Best practices
  - Color theory tips
  - Accessibility guidelines
- [ ] Document custom theme builder
  - User guide
  - Import/export instructions
  - Sharing themes
- [ ] Add Storybook documentation
  - Theme system overview
  - Component examples in all themes
  - Interactive theme switcher in Storybook

**Deliverables:**
- Comprehensive documentation
- User guides
- Developer guides
- Storybook integration

---

#### 6.2 Performance Optimization
**Tasks:**
- [ ] Minimize CSS output
  - Remove duplicate rules
  - Combine common properties
  - Use CSS custom property inheritance
- [ ] Code splitting
  - Lazy load ThemeCustomizer
  - Dynamic import for color picker
  - Separate chunk for theme utilities
- [ ] Theme preloading
  - Add `<link rel="preload">` for theme CSS
  - Preload most common themes
- [ ] Measure performance
  - Time theme switch operation
  - Measure CSS parse time
  - Check paint/layout metrics
  - Target: < 100ms total theme switch time

**Deliverables:**
- Optimized CSS bundle
- Code splitting implemented
- Performance benchmarks

---

#### 6.3 Testing
**Tasks:**
- [ ] Unit tests
  - Theme utility functions
  - Color generation algorithms
  - Validation functions
  - Import/export functions
- [ ] Integration tests
  - Theme switching flow
  - Custom theme creation
  - Theme persistence
  - System theme detection
- [ ] Visual regression tests
  - Chromatic/Percy integration
  - Capture screenshots of all themes
  - Detect unintended visual changes
- [ ] E2E tests (Playwright/Cypress)
  - User switches theme
  - User creates custom theme
  - Theme persists across reload
  - Import/export workflow

**Deliverables:**
- Comprehensive test suite
- Visual regression testing
- E2E tests for critical flows

**Testing Coverage Target:** 80%+

---

## Technical Specifications

### File Structure Changes

```
src/
├── design-tokens/
│   ├── base-tokens.json          # NEW: Universal tokens
│   ├── themes/                   # NEW: Theme directory
│   │   ├── terminal-dark.json
│   │   ├── terminal-light.json
│   │   ├── ocean-dark.json
│   │   ├── ocean-light.json
│   │   ├── forest-dark.json
│   │   ├── sunset-light.json
│   │   ├── high-contrast-dark.json
│   │   └── high-contrast-light.json
│   ├── build-tokens.js           # MODIFIED: Multi-theme processor
│   ├── generate-theme-types.js   # NEW: TS type generator
│   └── theme-schema.json         # NEW: Validation schema
│
├── contexts/
│   └── ThemeProvider.tsx         # NEW: Theme context provider
│
├── hooks/
│   └── useTheme.ts               # NEW: Theme hook
│
├── store/
│   ├── editorStore.ts            # EXISTING
│   └── themeStore.ts             # NEW: Theme state management
│
├── lib/
│   ├── utils.ts                  # EXISTING
│   ├── theme-registry.ts         # NEW: Auto-generated theme types
│   └── theme-utils.ts            # NEW: Theme utilities
│
├── components/ui/
│   ├── [31 existing components]  # EXISTING
│   ├── theme-toggle/             # NEW
│   │   ├── ThemeToggle.tsx
│   │   └── ThemeToggle.stories.tsx
│   ├── theme-switcher/           # NEW
│   │   ├── ThemeSwitcher.tsx
│   │   ├── ThemePreviewDot.tsx
│   │   └── ThemeSwitcher.stories.tsx
│   ├── theme-customizer/         # NEW
│   │   ├── ThemeCustomizer.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── ContrastChecker.tsx
│   │   └── ThemeCustomizer.stories.tsx
│   └── theme-preview/            # NEW
│       ├── ThemePreview.tsx
│       ├── ColorSwatch.tsx
│       └── ThemePreview.stories.tsx
│
├── styles/
│   ├── globals.css               # MODIFIED: Import transitions
│   ├── tokens.css                # MODIFIED: Multi-theme output
│   └── theme-transitions.css     # NEW: Transition rules
│
└── App.tsx                       # MODIFIED: Add ThemeProvider
```

---

### Generated CSS Structure

**Output: `src/styles/tokens.css`**

```css
/**
 * Design Tokens - Auto-generated from design tokens
 * DO NOT EDIT THIS FILE DIRECTLY
 * Run 'npm run build-themes' to regenerate
 */

/* ===== BASE TOKENS (Universal) ===== */
:root {
  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* Typography */
  --font-family-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-family-mono: "JetBrains Mono", "Fira Code", Consolas, Monaco, monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-lineHeight-tight: 1.25;
  --font-lineHeight-normal: 1.5;
  --font-lineHeight-relaxed: 1.75;

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Border Width */
  --border-width-0: 0;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  /* Transitions */
  --transition-duration-fast: 150ms;
  --transition-duration-base: 200ms;
  --transition-duration-slow: 300ms;
  --transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows (structure only, colors defined per theme) */
  --shadow-sm-offset: 0 1px 2px 0;
  --shadow-base-offset: 0 2px 4px 0;
  --shadow-md-offset: 0 4px 6px -1px;
  --shadow-lg-offset: 0 10px 15px -3px;
  --shadow-focus-offset: 0 0 10px 0;
  --shadow-accent-offset: 0 0 10px 0;
}

/* ===== THEME: Terminal Dark ===== */
[data-theme="terminal-dark"] {
  /* Palette */
  --color-palette-surface-base: #0a0e14;
  --color-palette-surface-elevated: #151a21;
  --color-palette-brand-primary: #00ff41;
  --color-palette-brand-primary-hover: #00cc34;
  --color-palette-accent-primary: #00e5ff;
  --color-palette-accent-secondary: #c792ea;
  --color-palette-feedback-error: #ff3333;
  --color-palette-feedback-warning: #ffb000;
  --color-palette-feedback-info: #5ccfe6;
  --color-palette-neutral-50: #f5f5f5;
  --color-palette-neutral-100: #e8e8e8;
  --color-palette-neutral-200: #d1d1d1;
  --color-palette-neutral-300: #b4b4b4;
  --color-palette-neutral-400: #8a8a8a;
  --color-palette-neutral-500: #6b6b6b;
  --color-palette-neutral-600: #4a4a4a;
  --color-palette-neutral-700: #2d2d2d;
  --color-palette-neutral-800: #1a1a1a;
  --color-palette-neutral-900: #0f0f0f;

  /* Semantic Tokens */
  --color-semantic-background: var(--color-palette-surface-base);
  --color-semantic-background-elevated: var(--color-palette-surface-elevated);
  --color-semantic-foreground: var(--color-palette-brand-primary);
  --color-semantic-foreground-muted: var(--color-palette-neutral-400);
  --color-semantic-primary: var(--color-palette-brand-primary);
  --color-semantic-primary-hover: var(--color-palette-brand-primary-hover);
  --color-semantic-success: var(--color-palette-brand-primary);
  --color-semantic-warning: var(--color-palette-feedback-warning);
  --color-semantic-error: var(--color-palette-feedback-error);
  --color-semantic-info: var(--color-palette-feedback-info);
  --color-semantic-accent: var(--color-palette-accent-primary);
  --color-semantic-border: var(--color-palette-neutral-700);
  --color-semantic-border-focus: var(--color-palette-brand-primary);
  --color-semantic-input-background: var(--color-palette-surface-elevated);
  --color-semantic-secondary: var(--color-palette-neutral-700);
  --color-semantic-secondary-foreground: var(--color-palette-brand-primary);
  --color-semantic-muted: var(--color-palette-neutral-800);

  /* Shadows */
  --shadow-sm: var(--shadow-sm-offset) rgba(0, 0, 0, 0.5);
  --shadow-base: var(--shadow-base-offset) rgba(0, 0, 0, 0.6);
  --shadow-md: var(--shadow-md-offset) rgba(0, 0, 0, 0.7);
  --shadow-lg: var(--shadow-lg-offset) rgba(0, 0, 0, 0.8);
  --shadow-focus: var(--shadow-focus-offset) rgba(0, 255, 65, 0.3);
  --shadow-accent: var(--shadow-accent-offset) rgba(0, 229, 255, 0.3);
}

/* ===== THEME: Terminal Light ===== */
[data-theme="terminal-light"] {
  /* Palette */
  --color-palette-surface-base: #f5f5f5;
  --color-palette-surface-elevated: #ffffff;
  --color-palette-brand-primary: #00cc34;
  --color-palette-brand-primary-hover: #00a329;
  --color-palette-accent-primary: #0099cc;
  --color-palette-accent-secondary: #9966cc;
  --color-palette-feedback-error: #cc0000;
  --color-palette-feedback-warning: #cc8800;
  --color-palette-feedback-info: #0099cc;
  --color-palette-neutral-50: #0f0f0f;
  --color-palette-neutral-100: #1a1a1a;
  --color-palette-neutral-200: #2d2d2d;
  --color-palette-neutral-300: #4a4a4a;
  --color-palette-neutral-400: #6b6b6b;
  --color-palette-neutral-500: #8a8a8a;
  --color-palette-neutral-600: #b4b4b4;
  --color-palette-neutral-700: #d1d1d1;
  --color-palette-neutral-800: #e8e8e8;
  --color-palette-neutral-900: #f5f5f5;

  /* Semantic Tokens */
  --color-semantic-background: var(--color-palette-surface-base);
  --color-semantic-background-elevated: var(--color-palette-surface-elevated);
  --color-semantic-foreground: var(--color-palette-neutral-50);
  --color-semantic-foreground-muted: var(--color-palette-neutral-400);
  --color-semantic-primary: var(--color-palette-brand-primary);
  --color-semantic-primary-hover: var(--color-palette-brand-primary-hover);
  --color-semantic-success: var(--color-palette-brand-primary);
  --color-semantic-warning: var(--color-palette-feedback-warning);
  --color-semantic-error: var(--color-palette-feedback-error);
  --color-semantic-info: var(--color-palette-feedback-info);
  --color-semantic-accent: var(--color-palette-accent-primary);
  --color-semantic-border: var(--color-palette-neutral-700);
  --color-semantic-border-focus: var(--color-palette-brand-primary);
  --color-semantic-input-background: var(--color-palette-surface-elevated);
  --color-semantic-secondary: var(--color-palette-neutral-800);
  --color-semantic-secondary-foreground: var(--color-palette-neutral-50);
  --color-semantic-muted: var(--color-palette-neutral-900);

  /* Shadows */
  --shadow-sm: var(--shadow-sm-offset) rgba(0, 0, 0, 0.1);
  --shadow-base: var(--shadow-base-offset) rgba(0, 0, 0, 0.15);
  --shadow-md: var(--shadow-md-offset) rgba(0, 0, 0, 0.2);
  --shadow-lg: var(--shadow-lg-offset) rgba(0, 0, 0, 0.25);
  --shadow-focus: var(--shadow-focus-offset) rgba(0, 204, 52, 0.4);
  --shadow-accent: var(--shadow-accent-offset) rgba(0, 153, 204, 0.4);
}

/* ===== THEME: Ocean Dark ===== */
[data-theme="ocean-dark"] {
  /* ... similar structure for ocean dark theme ... */
}

/* ===== THEME: Ocean Light ===== */
[data-theme="ocean-light"] {
  /* ... similar structure for ocean light theme ... */
}

/* Continue for all themes... */
```

---

### TypeScript Interfaces

**Auto-generated: `src/lib/theme-registry.ts`**

```typescript
/**
 * Theme Registry - Auto-generated from theme files
 * DO NOT EDIT THIS FILE DIRECTLY
 * Run 'npm run generate-theme-types' to regenerate
 */

export type ThemeId =
  | 'terminal-dark'
  | 'terminal-light'
  | 'ocean-dark'
  | 'ocean-light'
  | 'forest-dark'
  | 'sunset-light'
  | 'high-contrast-dark'
  | 'high-contrast-light'
  | 'custom'

export type ThemeCategory = 'light' | 'dark'

export interface ThemeMetadata {
  id: ThemeId
  name: string
  description: string
  category: ThemeCategory
  author: string
  version: string
  preview: {
    primary: string
    background: string
    accent: string
  }
}

export interface ThemeColorPalette {
  surface: {
    base: string
    elevated: string
  }
  brand: {
    primary: string
    'primary-hover': string
  }
  accent: {
    primary: string
    secondary: string
  }
  feedback: {
    error: string
    warning: string
    info: string
  }
  neutral: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
}

export interface ThemeSemanticColors {
  background: string
  'background-elevated': string
  foreground: string
  'foreground-muted': string
  primary: string
  'primary-hover': string
  success: string
  warning: string
  error: string
  info: string
  accent: string
  border: string
  'border-focus': string
  'input-background': string
  secondary: string
  'secondary-foreground': string
  muted: string
}

export interface ThemeShadows {
  sm: string
  base: string
  md: string
  lg: string
  focus: string
  accent: string
}

export interface Theme {
  meta: ThemeMetadata
  colors: {
    palette: ThemeColorPalette
    semantic: ThemeSemanticColors
  }
  shadows: ThemeShadows
}

// Theme registry
export const themes: Record<ThemeId, ThemeMetadata> = {
  'terminal-dark': {
    id: 'terminal-dark',
    name: 'Terminal Dark',
    description: 'Cyberpunk terminal aesthetic with neon green accents',
    category: 'dark',
    author: 'DesignVibe',
    version: '1.0.0',
    preview: {
      primary: '#00ff41',
      background: '#0a0e14',
      accent: '#00e5ff'
    }
  },
  'terminal-light': {
    id: 'terminal-light',
    name: 'Terminal Light',
    description: 'Light variant of terminal theme',
    category: 'light',
    author: 'DesignVibe',
    version: '1.0.0',
    preview: {
      primary: '#00cc34',
      background: '#f5f5f5',
      accent: '#0099cc'
    }
  },
  // ... other themes
}

// Utility functions
export function getTheme(id: ThemeId): ThemeMetadata {
  return themes[id]
}

export function getThemesByCategory(category: ThemeCategory): ThemeMetadata[] {
  return Object.values(themes).filter(theme => theme.category === category)
}

export function getDefaultTheme(): ThemeId {
  return 'terminal-dark'
}

export function isValidThemeId(id: string): id is ThemeId {
  return id in themes
}
```

---

### Custom Theme Types

**File: `src/types/custom-theme.ts`**

```typescript
export interface CustomThemeColors {
  // Core colors (user-provided)
  primary: string
  background: string
  accent: string

  // Auto-generated derivatives
  'primary-hover'?: string
  'primary-foreground'?: string
  'background-elevated'?: string
  foreground?: string

  // Optional overrides
  error?: string
  warning?: string
  info?: string
  success?: string

  // Neutral scale (auto-generated if not provided)
  neutral?: {
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
  }
}

export interface CustomTheme {
  meta: {
    id: 'custom'
    name: string
    description?: string
    category: 'light' | 'dark'
    baseTheme?: ThemeId
  }
  colors: CustomThemeColors
  shadows?: {
    focus?: string
    accent?: string
  }
}

export interface ContrastIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  fix?: string
  pair?: {
    foreground: string
    background: string
    ratio: number
  }
}

export interface ValidationResult {
  valid: boolean
  issues: ContrastIssue[]
  warnings: ContrastIssue[]
}
```

---

## Key Considerations

### 1. Backward Compatibility

**Goal:** Zero breaking changes to existing components

**Strategy:**
- All existing CSS variable names remain unchanged
- Default theme stays `terminal-dark`
- Components continue working without modifications
- Gradual migration path for custom code

**Validation:**
- Run full test suite after Phase 1 refactoring
- Visual regression testing to catch unintended changes
- Ensure Storybook stories render identically

---

### 2. Performance

**Targets:**
- Theme CSS bundle: < 50KB (gzipped for all 8 themes)
- Theme switch time: < 100ms (including animation)
- Custom theme generation: < 200ms
- No layout shift or flash of unstyled content (FOUC)

**Optimizations:**
- CSS custom property inheritance to reduce duplication
- Code splitting for ThemeCustomizer (lazy load)
- Debounce color picker updates (300ms)
- Memoize theme generation calculations
- Use CSS containment for better paint performance
- Preload critical themes

**Measurement:**
```typescript
// Performance monitoring
performance.mark('theme-switch-start')
applyTheme(newTheme)
performance.mark('theme-switch-end')
performance.measure('theme-switch', 'theme-switch-start', 'theme-switch-end')
const duration = performance.getEntriesByName('theme-switch')[0].duration
console.log(`Theme switch took ${duration}ms`)
```

---

### 3. Accessibility

**WCAG AA Compliance:**
- Text contrast: 4.5:1 minimum (3:1 for large text 18pt+)
- UI component contrast: 3:1 minimum
- Focus indicators: Clearly visible in all themes
- Color not sole means of conveying information

**Automated Validation:**
```typescript
import { getContrast } from 'polished'

function validateContrast(fg: string, bg: string, type: 'text' | 'ui'): boolean {
  const ratio = getContrast(fg, bg)
  const minRatio = type === 'text' ? 4.5 : 3.0
  return ratio >= minRatio
}
```

**Features:**
- High contrast theme variants
- Respect `prefers-reduced-motion` (disable transitions)
- Respect `prefers-contrast` (switch to high-contrast theme)
- Respect `prefers-color-scheme` (auto dark/light)
- Screen reader announcements for theme changes

**Testing:**
- Manual testing with NVDA, JAWS, VoiceOver
- Automated testing with axe-core
- Keyboard navigation testing
- Color blindness simulation (Coblis, Chrome DevTools)

---

### 4. User Experience

**Seamless Theme Switching:**
- No page reload required
- Smooth transitions (300ms cross-fade)
- State preserved (no data loss)
- Instant feedback (loading indicators if needed)

**Theme Persistence:**
- LocalStorage for theme preference
- Survives browser restarts
- Syncs across tabs (storage events)

**Smart Defaults:**
- Detect system theme on first visit
- Remember user's last choice
- Fallback to `terminal-dark` if corrupted

**Preview Before Apply:**
- Live preview in ThemeCustomizer
- Preview in dropdown hover (optional)
- Undo/revert capability

**No Flash of Unstyled Content:**
```html
<!-- Inline script in index.html to apply theme before render -->
<script>
  (function() {
    const theme = localStorage.getItem('theme-preference')
    if (theme) {
      const parsed = JSON.parse(theme)
      document.documentElement.setAttribute('data-theme', parsed.state.current)
    }
  })()
</script>
```

---

### 5. Developer Experience

**Type Safety:**
- All theme IDs as TypeScript unions
- Auto-complete for theme functions
- Compile-time validation

**Hot Reload:**
- Theme changes reload instantly in dev mode
- Vite HMR support
- No full page refresh needed

**Validation:**
- Build-time validation of theme files
- JSON schema validation
- TypeScript type checking

**Documentation:**
- Inline JSDoc comments
- Comprehensive README
- Storybook integration
- Code examples

**Debugging:**
```typescript
// Theme debugging utilities
export function debugTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const computed = getComputedStyle(document.documentElement)
  const vars = {}

  // Extract all CSS variables
  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i]
    if (prop.startsWith('--color-')) {
      vars[prop] = computed.getPropertyValue(prop)
    }
  }

  console.table({
    theme: current,
    variables: vars
  })
}

// Usage: debugTheme() in console
```

---

## Success Metrics

### Technical Metrics
- [ ] All 31 existing components work with all 8 themes
- [ ] Theme switch completes in < 100ms (avg)
- [ ] CSS bundle size < 50KB gzipped (all themes)
- [ ] Custom theme generation < 200ms
- [ ] Zero console errors or warnings
- [ ] TypeScript strict mode passes
- [ ] Test coverage > 80%

### Accessibility Metrics
- [ ] All themes pass WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus indicators visible in all themes
- [ ] Screen reader compatibility verified
- [ ] Keyboard navigation fully functional
- [ ] Reduced motion preference respected
- [ ] High contrast theme available

### User Experience Metrics
- [ ] Theme preference persists across sessions
- [ ] No flash of unstyled content on load
- [ ] Smooth transitions between themes
- [ ] Custom theme builder fully functional
- [ ] Import/export works reliably
- [ ] Theme sharing via URL works

### Documentation Metrics
- [ ] Comprehensive theme creation guide
- [ ] API reference complete
- [ ] User guide for customization
- [ ] Storybook stories for all themes
- [ ] Code examples provided

---

## Dependencies

### New Packages

```json
{
  "dependencies": {
    "react-colorful": "^5.6.1",
    "tinycolor2": "^1.6.0"
  },
  "devDependencies": {
    "@types/tinycolor2": "^1.4.6"
  }
}
```

**Justification:**
- **react-colorful:** Lightweight (2.8KB), accessible color picker
- **tinycolor2:** Color manipulation utilities (darken, lighten, contrast)

### Alternative Options

**Color Libraries:**
- `color2k` (2KB, smaller but less features)
- `polished` (6KB, more utilities but larger)
- `chroma-js` (13KB, powerful but overkill)

**Recommendation:** Use `react-colorful` + `tinycolor2` for best balance of size and functionality.

---

## Timeline Summary

| Phase | Duration | Focus | Key Deliverables |
|-------|----------|-------|------------------|
| **Phase 1** | Week 1 | Foundation | Token refactoring, build system, theme registry |
| **Phase 2** | Week 2 | Runtime System | Theme store, provider, utilities |
| **Phase 3** | Week 3 | UI Components | Toggle, switcher, preview components |
| **Phase 4** | Week 4 | Advanced Features | Custom theme builder, import/export |
| **Phase 5** | Week 5 | Additional Themes | 6 new themes, comprehensive testing |
| **Phase 6** | Week 6 | Polish | Documentation, optimization, testing |

**Total Duration:** 6 weeks
**Effort:** Approximately 120-150 hours

### Weekly Breakdown

**Week 1 (Foundation):**
- 20% token refactoring
- 30% build system enhancement
- 30% type generation
- 20% testing & validation

**Week 2 (Runtime):**
- 30% state management
- 30% theme provider
- 20% utilities
- 20% integration

**Week 3 (UI):**
- 25% ThemeToggle
- 35% ThemeSwitcher
- 25% ThemePreview
- 15% integration

**Week 4 (Advanced):**
- 40% ThemeCustomizer
- 30% import/export
- 20% storage
- 10% polish

**Week 5 (Themes):**
- 50% create 6 new themes
- 40% comprehensive testing
- 10% bug fixes

**Week 6 (Finalization):**
- 30% documentation
- 30% optimization
- 30% testing
- 10% final review

---

## Next Steps

### Immediate Actions

1. **Review & Approve Plan**
   - Stakeholder review of architecture
   - Approve timeline and scope
   - Identify any missing requirements

2. **Setup Development Environment**
   - Create feature branch: `feature/runtime-theme-system`
   - Install new dependencies
   - Setup project board for tracking

3. **Begin Phase 1**
   - Start with token refactoring
   - Create base-tokens.json
   - Create terminal-dark.json theme file

4. **Establish Review Process**
   - Code review requirements
   - QA testing procedures
   - Documentation standards

### Incremental Delivery

**PR Strategy:**
- **PR #1:** Phase 1.1 - Token refactoring
- **PR #2:** Phase 1.2 - Enhanced build system
- **PR #3:** Phase 1.3 - Theme registry
- **PR #4:** Phase 2 - Runtime theme system
- **PR #5:** Phase 3 - UI components
- **PR #6:** Phase 4 - Custom theme builder
- **PR #7:** Phase 5 - Additional themes
- **PR #8:** Phase 6 - Documentation & polish

**Advantages:**
- Smaller, reviewable PRs
- Incremental testing
- Easier rollback if issues arise
- Continuous integration

### Risk Mitigation

**Potential Risks:**
1. **Breaking changes to existing components**
   - Mitigation: Comprehensive visual regression testing
   - Fallback: Keep old token system in parallel during migration

2. **Performance degradation**
   - Mitigation: Performance benchmarks at each phase
   - Target: < 100ms theme switch time

3. **Browser compatibility issues**
   - Mitigation: Cross-browser testing in Phase 5
   - Fallback: Graceful degradation for unsupported features

4. **Accessibility regressions**
   - Mitigation: Automated axe-core testing, manual screen reader testing
   - Requirement: All themes must pass WCAG AA

5. **Scope creep**
   - Mitigation: Strict adherence to 6-phase plan
   - Process: Change requests require stakeholder approval

### Success Criteria

**Phase 1 Complete When:**
- [ ] Token structure refactored without breaking changes
- [ ] Build system generates multi-theme CSS
- [ ] TypeScript types auto-generated
- [ ] All tests passing

**Phase 2 Complete When:**
- [ ] Theme switching works in UI
- [ ] Theme preference persists
- [ ] System theme detection works
- [ ] Smooth transitions implemented

**Phase 3 Complete When:**
- [ ] Theme toggle in toolbar
- [ ] Theme switcher in settings
- [ ] All themes selectable
- [ ] Storybook integration

**Phase 4 Complete When:**
- [ ] Custom theme builder functional
- [ ] Import/export works
- [ ] Custom themes persist
- [ ] Color generation validated

**Phase 5 Complete When:**
- [ ] 8 themes available
- [ ] All themes tested with all components
- [ ] WCAG AA compliance verified
- [ ] Cross-browser compatibility confirmed

**Phase 6 Complete When:**
- [ ] Documentation complete
- [ ] Performance targets met
- [ ] Test coverage > 80%
- [ ] Ready for production deployment

---

## Appendix

### A. Theme Creation Checklist

When creating a new theme, ensure:
- [ ] Unique theme ID (kebab-case)
- [ ] Complete metadata (name, description, category, author, version)
- [ ] All palette colors defined
- [ ] All semantic tokens reference palette
- [ ] Shadow colors match theme
- [ ] WCAG AA contrast ratios met
- [ ] Preview colors accurate
- [ ] Theme validated against schema
- [ ] Visual testing with all components
- [ ] Added to theme registry

### B. Token Reference

**Required Semantic Tokens:**
- `background`, `background-elevated`
- `foreground`, `foreground-muted`
- `primary`, `primary-hover`
- `success`, `warning`, `error`, `info`
- `accent`
- `border`, `border-focus`
- `input-background`
- `secondary`, `secondary-foreground`
- `muted`

**Required Shadow Tokens:**
- `sm`, `base`, `md`, `lg`
- `focus`, `accent`

### C. Color Palette Recommendations

**Dark Theme Palette:**
- Background: 10-20 lightness
- Elevated: +5-10 lightness from background
- Primary: 45-60 lightness, saturated
- Foreground: 80-95 lightness
- Neutrals: 10-90 range

**Light Theme Palette:**
- Background: 95-100 lightness
- Elevated: Pure white or slight tint
- Primary: 40-55 lightness, saturated
- Foreground: 10-20 lightness
- Neutrals: 10-90 range (inverted from dark)

**Accessibility:**
- Text on background: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum
- Use color contrast checker during creation

### D. Resources

**Design Tools:**
- [Coolors](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel & themes
- [Paletton](https://paletton.com/) - Color scheme designer

**Accessibility Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colorable](https://colorable.jxnblk.com/) - Color combination tester
- [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/) - Color blindness simulator

**Documentation:**
- [Design Tokens Community Group](https://design-tokens.github.io/community-group/format/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## Conclusion

This plan provides a comprehensive roadmap for implementing a robust, accessible, and performant runtime theme replacement system. The phased approach ensures incremental delivery with minimal risk, while the detailed specifications provide clear guidance for implementation.

**Key Takeaways:**
- 6-week implementation timeline
- 8 pre-built themes (dark/light variants)
- Custom theme builder with live preview
- Full WCAG AA accessibility compliance
- Sub-100ms theme switching performance
- Zero breaking changes to existing code

The system will empower users to personalize their experience while maintaining the high-quality design standards of the DesignVibe aesthetic.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-16
**Status:** Proposed
**Next Review:** After Phase 1 completion
