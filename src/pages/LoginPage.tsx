import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Terminal } from 'lucide-react'

export const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary font-mono">Loading...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/documents" replace />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2">
        <Terminal className="h-8 w-8 text-primary text-glow" />
        <h1 className="text-2xl font-bold font-mono text-primary">WYSIWYG Editor</h1>
      </div>

      <LoginForm />
    </div>
  )
}
