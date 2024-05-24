import { useAuthAtom } from '@/atoms/v2/auth-atom'
import { AuthService } from '@/services/auth-service'
import { createContext, useEffect, useMemo, useState } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false
})

export default function AuthContextProvider({
  children
}: {
  children?: React.ReactNode
}) {
  const [auth] = useAuthAtom()
  const [isLoading, setIsLoading] = useState(() => !!auth)
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!auth)

  console.log({ auth, isLoading, isAuthenticated })

  useEffect(() => {
    if (!auth) {
      return
    }
    // AuthService.me()
    //   .then((res) => {
    //     console.log({ me: res })
    //   })
    //   .catch(() => {
    //     setIsAuthenticated(() => false)
    //   })
    //   .finally(() => {
    //     setIsLoading(() => false)
    //   })
  }, [auth])

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading
    }),
    [isAuthenticated, isLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
