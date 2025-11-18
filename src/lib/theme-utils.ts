import type { ThemeId, ThemeCategory } from './theme-registry'
import { themes } from './theme-registry'

/**
 * Apply a theme to the document
 */
export function applyTheme(themeId: ThemeId): void {
  if (typeof document === 'undefined') return

  // Use View Transition API if available for smooth theme switching
  if ('startViewTransition' in document) {
    (document as any).startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', themeId)
    })
  } else {
    document.documentElement.setAttribute('data-theme', themeId)
  }
}

/**
 * Apply theme with transition (fallback for browsers without View Transition API)
 */
export function applyThemeWithTransition(themeId: ThemeId): void {
  applyTheme(themeId)
}

/**
 * Detect system theme preference
 */
export async function detectSystemTheme(): Promise<ThemeCategory> {
  if (typeof window === 'undefined') return 'dark'

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

/**
 * Get the opposite theme variant (light ↔ dark)
 */
export function getOppositeTheme(themeId: Exclude<ThemeId, 'custom'>): ThemeId {
  const theme = themes[themeId]
  if (!theme) return themeId

  // Get themes in the opposite category
  const oppositeCategory: ThemeCategory = theme.category === 'dark' ? 'light' : 'dark'
  const oppositeThemes = Object.values(themes).filter(
    (t) => t.category === oppositeCategory
  )

  // Return the first opposite theme, or the same theme if none found
  return oppositeThemes[0]?.id || themeId
}

/**
 * Listen to system theme changes
 */
export function watchSystemTheme(callback: (category: ThemeCategory) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handler = (e: MediaQueryListEvent | MediaQueryList) => {
    callback(e.matches ? 'dark' : 'light')
  }

  // Initial call
  handler(mediaQuery)

  // Listen for changes
  mediaQuery.addEventListener('change', handler)

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handler)
  }
}

/**
 * Get the current theme from the document
 */
export function getCurrentTheme(): ThemeId | null {
  if (typeof document === 'undefined') return null

  const themeAttr = document.documentElement.getAttribute('data-theme')
  return (themeAttr as ThemeId) || null
}

/**
 * Validate if a string is a valid theme ID
 */
export function validateThemeId(id: unknown): id is ThemeId {
  if (typeof id !== 'string') return false
  return id === 'custom' || id in themes
}

/**
 * Inject custom theme CSS (for future custom theme support)
 */
export function injectCustomTheme(cssVariables: Record<string, string>): void {
  if (typeof document === 'undefined') return

  const styleId = 'custom-theme-vars'
  let styleEl = document.getElementById(styleId)

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = styleId
    document.head.appendChild(styleEl)
  }

  const cssContent = `[data-theme="custom"] {
${Object.entries(cssVariables)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}`

  styleEl.textContent = cssContent
}

/**
 * Remove custom theme CSS
 */
export function removeCustomTheme(): void {
  if (typeof document === 'undefined') return

  const styleEl = document.getElementById('custom-theme-vars')
  if (styleEl) {
    styleEl.remove()
  }
}
