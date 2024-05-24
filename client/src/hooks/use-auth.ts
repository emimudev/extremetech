import { useCurrentUser } from '@/atoms'
import { IUser } from '@/types'
import { RESET } from 'jotai/utils'

export default function useAuth() {
  const { userLogged, setUser } = useCurrentUser()

  return {
    isAuthenticated: !!userLogged,
    user: userLogged,
    login: (user: IUser) => setUser(user),
    logout: () => setUser(RESET)
  }
}
