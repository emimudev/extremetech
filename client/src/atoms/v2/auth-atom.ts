import { User } from '@/types/v2'
import { LoginResponse } from '@/types/v2/login-response'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithDefault } from 'jotai/utils'

export const defaultAnonymousUser: User = {
  id: 'anonymous',
  email: '',
  name: 'Anonymous',
  lastname: 'User',
  createdAt: new Date().toISOString(),
  fullName: 'Anonymous User',
  isEnabled: true,
  isLocked: false,
  role: {
    id: 'anonymous',
    name: 'anonymous',
    description: 'Anonymous user',
    type: 'CLIENT'
  }
}

const authAtomWriter = atomWithDefault(() => {
  const storedAuthStr = localStorage.getItem('auth')
  if (storedAuthStr) {
    const storedAuth = JSON.parse(storedAuthStr)
    return storedAuth as LoginResponse
  }
  return null
})

export const authAtom = atom(
  (get) => get(authAtomWriter),
  (_, set, data: LoginResponse | null) => {
    if (data) {
      localStorage.setItem('auth', JSON.stringify(data))
    } else {
      localStorage.removeItem('auth')
    }
    set(authAtomWriter, data)
  }
)

export const useAuthAtomWrite = () => useSetAtom(authAtom)
export const useAuthAtomRead = () => useAtomValue(authAtom)
export const useAuthAtom = () =>
  [useAuthAtomRead(), useAuthAtomWrite()] as const
