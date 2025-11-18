import { createContext, useEffect, type PropsWithChildren } from 'react'
import { useThemeStore } from '../store/themeStore'
import { applyTheme, watchSystemTheme } from '../lib/theme-utils'
import type { ThemeId, ThemeMetadata } from '../lib/theme-registry'
import { getAllThemes } from '../lib/theme-registry'

interface ThemeContextValue {
  currentTheme: ThemeId
  setTheme: (id: ThemeId) => void
  toggleTheme: () => void
  themes: ThemeMetadata[]
  isCustomTheme: boolean
  followSystem: boolean
  setFollowSystem: (follow: boolean) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: PropsWithChildren) {
  const {
    current,
    setTheme,
    toggleTheme,
    followSystem,
    setFollowSystem,
    customTheme,
  } = useThemeStore()

  const allThemes = getAllThemes()
  const isCustomTheme = current === 'custom' && customTheme !== null

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    applyTheme(current)
  }, [current])

  // Watch for system theme changes if followSystem is enabled
  useEffect(() => {
    if (!followSystem) return

    const cleanup = watchSystemTheme((category) => {
      // Find a theme matching the system preference
      const matchingTheme = allThemes.find((t) => t.category === category)
      if (matchingTheme) {
        setTheme(matchingTheme.id)
      }
    })

    return cleanup
  }, [followSystem, setTheme, allThemes])

  // Respect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const contextValue: ThemeContextValue = {
    currentTheme: current,
    setTheme,
    toggleTheme,
    themes: allThemes,
    isCustomTheme,
    followSystem,
    setFollowSystem,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
