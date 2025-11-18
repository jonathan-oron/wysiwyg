import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ThemeId } from '../lib/theme-registry'
import { getDefaultTheme } from '../lib/theme-registry'

export interface CustomTheme {
  name: string
  colors: Record<string, string>
}

interface ThemeState {
  // Current active theme
  current: ThemeId

  // User preferences
  followSystem: boolean

  // Custom theme data
  customTheme: CustomTheme | null

  // Actions
  setTheme: (id: ThemeId) => void
  toggleTheme: () => void
  setFollowSystem: (follow: boolean) => void
  saveCustomTheme: (theme: CustomTheme) => void
  deleteCustomTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      current: getDefaultTheme(),
      followSystem: false,
      customTheme: null,

      setTheme: (id) => {
        set({ current: id })
        // Emit custom event for theme change
        window.dispatchEvent(
          new CustomEvent('themechange', { detail: { themeId: id } })
        )
      },

      toggleTheme: () => {
        const { current } = get()
        // Toggle between terminal-dark and kpop-rainbow
        const newTheme: ThemeId =
          current === 'terminal-dark' ? 'kpop-rainbow' : 'terminal-dark'
        get().setTheme(newTheme)
      },

      setFollowSystem: (follow) => {
        set({ followSystem: follow })

        if (follow) {
          // Detect and apply system theme
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches
          get().setTheme(prefersDark ? 'terminal-dark' : 'kpop-rainbow')
        }
      },

      saveCustomTheme: (theme) => {
        set({ customTheme: theme, current: 'custom' })
      },

      deleteCustomTheme: () => {
        set({ customTheme: null })
        // Switch back to default theme
        get().setTheme(getDefaultTheme())
      },
    }),
    {
      name: 'theme-preference',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
