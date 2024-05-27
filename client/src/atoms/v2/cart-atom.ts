import { Cart } from '@/types/v2'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { defaultAnonymousUser } from './auth-atom'

export const LOCAL_CART_KEY = 'local-cart'

export const defaultAnonymousCart: Cart = {
  id: 'anonymous',
  owner: defaultAnonymousUser,
  items: []
}

const cartAtom = atom<Cart>(defaultAnonymousCart)

export const useCartAtomValue = () => useAtomValue(cartAtom)
export const useCartSetAtom = () => useSetAtom(cartAtom)
export const useCartAtom = () => [useCartAtomValue(), useCartSetAtom()] as const
