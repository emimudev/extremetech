import { useAuthAtom } from '@/atoms/v2/auth-atom'
import { AuthService } from '@/services/auth-service'
import { LoginRequest } from '@/types/v2'
import { useCallback, useMemo } from 'react'

export function useAuth() {
  const [auth, setAuth] = useAuthAtom()

  const login = useCallback(
    (values: LoginRequest) => {
      if (auth) return Promise.resolve(auth)
      return AuthService.login(values).then((res) => {
        console.log({ res })
        // localStorage.setItem('auth', JSON.stringify(res))
        setAuth(res)
        return res
      }).catch((error) => {
        console.log({ error })
        throw error?.response?.data
      })
    },
    [setAuth, auth]
  )

  const logout = useCallback(() => {
    setAuth(null)
  }, [setAuth])

  const currentUser = useMemo(() => auth?.user, [auth])

  return {
    isAuthenticated: auth && auth.user,
    user: currentUser,
    login,
    logout
  }
}
