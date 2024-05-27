import { WishList } from '@/types/wish-list'
import { atom } from 'jotai'

export const wishListAtom = atom<WishList | null>(null)
