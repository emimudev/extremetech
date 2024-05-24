import { atom } from 'jotai'
import sortBy from 'sort-by'
import { productsAtom } from './products-atom'

export const bestOffersProductsAtom = atom((get) => {
  const products = get(productsAtom)
  const offers = products.filter((product) => product.offer)
  return offers.sort(sortBy('offer.discount'))
})
