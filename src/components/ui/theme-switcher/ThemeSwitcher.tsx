import { Palette, Check } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '../button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '../dropdown-menu/DropdownMenu'
import { cn } from '@/lib/utils'

interface ThemePreviewDotProps {
  colors: {
    primary: string
    background: string
    accent: string
  }
}

function ThemePreviewDot({ colors }: ThemePreviewDotProps) {
  return (
    <div className="flex gap-1 mr-2">
      <div
        className="w-3 h-3 rounded-full border border-border"
        style={{ backgroundColor: colors.primary }}
      />
      <div
        className="w-3 h-3 rounded-full border border-border"
        style={{ backgroundColor: colors.accent }}
      />
    </div>
  )
}

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes, followSystem, setFollowSystem } = useTheme()

  // Group themes by category
  const darkThemes = themes.filter((t) => t.category === 'dark')
  const lightThemes = themes.filter((t) => t.category === 'light')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="mr-2 h-4 w-4" />
          Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={followSystem}
          onCheckedChange={setFollowSystem}
        >
          Follow System
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        {darkThemes.length > 0 && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Dark Themes
            </DropdownMenuLabel>
            {darkThemes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={cn(
                  'cursor-pointer',
                  currentTheme === theme.id && 'bg-accent'
                )}
              >
                <ThemePreviewDot colors={theme.preview} />
                <span className="flex-1">{theme.name}</span>
                {currentTheme === theme.id && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {lightThemes.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Light Themes
            </DropdownMenuLabel>
            {lightThemes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={cn(
                  'cursor-pointer',
                  currentTheme === theme.id && 'bg-accent'
                )}
              >
                <ThemePreviewDot colors={theme.preview} />
                <span className="flex-1">{theme.name}</span>
                {currentTheme === theme.id && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
