import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { mockAuthService } from '../services/authService'
import { User } from '@/types'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: () => mockAuthService.getCurrentUser(),
    staleTime: Infinity,
  })

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      mockAuthService.login(username, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user)
      navigate('/documents')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => {
      mockAuthService.logout()
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null)
      navigate('/')
    },
  })

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  }
}
