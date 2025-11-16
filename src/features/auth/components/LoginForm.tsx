import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, Input, Label, Alert, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { login, isLoggingIn, loginError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <Card className="w-full max-w-md" variant="terminal">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter any username and password to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register('username')}
              disabled={isLoggingIn}
            />
            {errors.username && (
              <p className="text-sm text-error">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              disabled={isLoggingIn}
            />
            {errors.password && (
              <p className="text-sm text-error">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <Alert variant="error">
              {loginError instanceof Error ? loginError.message : 'Login failed'}
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            This is a demo. Any username/password will work.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
