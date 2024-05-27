import type { ReactNode } from 'react'
import { PRIVATE_ROLES, useAuth } from '@/hooks/v2/use-auth'
import { Navigate } from 'react-router-dom'
import { RoleType } from '@/types/v2'

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
