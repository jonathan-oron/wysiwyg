import { ReactNode } from 'react'

interface EditorLayoutProps {
  children: ReactNode
}

export const EditorLayout = ({ children }: EditorLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {children}
    </div>
  )
}
