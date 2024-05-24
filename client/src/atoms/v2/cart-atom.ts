import { Cart } from '@/types/v2'
import { atom, useAtomValue, useSetAtom } from 'jotai'

export const cartAtom = atom<Partial<Cart> | null>(null)

export const useCartAtomRead = () => useAtomValue(cartAtom)
export const useCartAtomWrite = () => useSetAtom(cartAtom)
// prettier-ignore
export const useCartAtom = () => [useCartAtomRead(), useCartAtomWrite()] as const
