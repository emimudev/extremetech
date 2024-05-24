import { IUser } from '@/types'
import { useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentUserAtom = atomWithStorage<IUser | null>(
  'user',
  null,
  undefined,
  { getOnInit: true }
)

export const useCurrentUserWrite = () => {
  const setUser = useSetAtom(currentUserAtom)

  return {
    setUser
  }
}
export const useCurrentUserRead = () => {
  const currentUser = useAtomValue(currentUserAtom)
  return {
    userLogged: currentUser
  }
}
export const useCurrentUser = () => {
  return {
    ...useCurrentUserWrite(),
    ...useCurrentUserRead()
  }
}
