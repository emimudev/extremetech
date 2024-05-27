import { useAuthAtom } from '@/atoms/auth-atom'
import { wishListAtom } from '@/atoms/wish-list.atom'
import { useAtom, useSetAtom } from 'jotai'
import { createContext } from 'react'

const WishListContext = createContext(null)

export default function WishListContextProvider({
  children
}: {
  children?: React.ReactNode
}) {
  const [auth, setAuth] = useSetAtom(wishListAtom)

  return (
    <WishListContext.Provider value={null}>
      {children}
    </WishListContext.Provider>
  )
}
