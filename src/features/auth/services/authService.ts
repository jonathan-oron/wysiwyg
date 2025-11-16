import { User } from '@/types'

export const mockAuthService = {
  login: async (username: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    const user: User = {
      id: '1',
      username,
      email: `${username}@example.com`,
      createdAt: new Date(),
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    return user
  },

  logout: (): void => {
    localStorage.removeItem('currentUser')
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('currentUser')
    if (!stored) return null

    try {
      const user = JSON.parse(stored)
      return {
        ...user,
        createdAt: new Date(user.createdAt),
      }
    } catch {
      return null
    }
  },

  isAuthenticated: (): boolean => {
    return !!mockAuthService.getCurrentUser()
  },
}
