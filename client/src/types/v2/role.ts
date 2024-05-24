type RoleType = 'CLIENT' | 'ADMIN' | 'SUPER_ADMIN'

export interface Role {
  id: string
  name: string
  description: string
  type: RoleType
}
