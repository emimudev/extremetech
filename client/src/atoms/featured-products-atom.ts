import { atom } from 'jotai'
import { productsAtom } from './products-atom'
import randomItem from 'random-item'

export const featuredProductsAtom = atom((get) => {
  const products = get(productsAtom)
  const randomItems = randomItem.multiple(products, 12)
  return randomItems
})
