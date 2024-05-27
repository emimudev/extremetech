import { PRIVATE_ROLES, useAuth } from '@/hooks/use-auth'
import { RoleType } from '@/types'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export function PrivateRoute({
  children,
  roles
}: {
  children: ReactNode
  roles?: RoleType[]
}) {
  const { isAuthenticated, user } = useAuth()

  roles = roles || PRIVATE_ROLES

  if (!isAuthenticated || !user) {
    return <Navigate to='/' />
  }

  if (!roles.includes(user.role.type)) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}
