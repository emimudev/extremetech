import { LoginResponse } from '@/types/v2/login-response'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithDefault } from 'jotai/utils'

// export const authAtom = atom<LoginResponse | null>(null)
export const authAtom = atomWithDefault(() => {
  const storedAuthStr = localStorage.getItem('auth')
  if (storedAuthStr) {
    const storedAuth = JSON.parse(storedAuthStr)
    return storedAuth as LoginResponse
  }
  return null
})

export const readWriteAuthAtom = atom(
  (get) => get(authAtom),
  (_, set, data: LoginResponse | null) => {
    if (data) {
      localStorage.setItem('auth', JSON.stringify(data))
    } else {
      console.log('Removing auth from localStorage')
      localStorage.removeItem('auth')
    }
    set(authAtom, data)
  }
)

export const useAuthAtomWrite = () => useSetAtom(readWriteAuthAtom)
export const useAuthAtomRead = () => useAtomValue(readWriteAuthAtom)
export const useAuthAtom = () =>
  [useAuthAtomRead(), useAuthAtomWrite()] as const
