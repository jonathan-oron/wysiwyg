import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeProvider'

/**
 * Hook to access the theme context
 * @throws {Error} if used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
