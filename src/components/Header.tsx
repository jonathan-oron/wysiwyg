import { Link } from 'react-router-dom'
import { Button, Avatar, AvatarFallback, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Terminal, LogOut, FileText } from 'lucide-react'

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-mono text-primary">WYSIWYG Editor</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link to="/documents">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
