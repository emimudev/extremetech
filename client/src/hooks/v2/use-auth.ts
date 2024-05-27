import { useAuthAtom } from '@/atoms/v2/auth-atom'
import { defaultAnonymousCart, useCartSetAtom } from '@/atoms/v2/cart-atom'
import { AuthService } from '@/services/auth-service'
import { LoginRequest, RoleType, SignupRequest } from '@/types/v2'
import { useCallback, useMemo } from 'react'

export const DEFAULT_ROLES: RoleType[] = ['CLIENT', 'ADMIN', 'SUPER_ADMIN'] as const
export const PRIVATE_ROLES: RoleType[] = ['ADMIN', 'SUPER_ADMIN'] as const

export function useAuth() {
  const [auth, setAuth] = useAuthAtom()
  const setCart = useCartSetAtom()

  const login = useCallback(
    (values: LoginRequest) => {
      if (auth) return Promise.resolve(auth)
      return AuthService.login(values)
        .then((res) => {
          setAuth(res)
          return res
        })
        .catch((error) => {
          console.log({ error })
          throw error?.response?.data
        })
    },
    [setAuth, auth]
  )

  const logout = useCallback(() => {
    setAuth(null)
    setCart(defaultAnonymousCart)
  }, [setAuth, setCart])

  const signup = useCallback(
    (values: SignupRequest) => {
      return AuthService.signup(values)
        .then((res) => {
          // console.log('useAuth', { res })
          setAuth(res)
          return res
        })
        .catch((error) => {
          // console.log('useAuthError', { error })
          throw error?.response?.data
        })
    },
    [setAuth]
  )

  const currentUser = useMemo(() => auth?.user, [auth])

  return {
    isAuthenticated: auth && auth.user,
    user: currentUser,
    login,
    signup,
    logout
  }
}
