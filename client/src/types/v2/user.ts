import { Role } from './role'

export interface User {
  id: string
  name: string
  lastname: string
  fullName: string
  email: string
  createdAt: string
  role: Role
  isEnabled: boolean
  isLocked: boolean
}
