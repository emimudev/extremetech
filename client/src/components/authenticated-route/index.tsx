import { useAuth } from '@/hooks/use-auth'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}
