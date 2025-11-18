import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '../button/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/Tooltip'

export function ThemeToggle() {
  const { currentTheme, toggleTheme, themes } = useTheme()

  const currentThemeData = themes.find((t) => t.id === currentTheme)
  const isDark = currentThemeData?.category === 'dark'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            className="h-9 w-9 px-0"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
