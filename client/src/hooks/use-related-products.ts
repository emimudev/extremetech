import { productsAtom } from '@/atoms'
import type { IProduct } from '@/types'
import { useAtomValue } from 'jotai'
import arrayShuffle from 'array-shuffle'

export interface UseRelatedProductsProps {
  product: IProduct
  limit?: number
}

export default function useRelatedProducts({
  product,
  limit = 10
}: UseRelatedProductsProps) {
  const allProducts = useAtomValue(productsAtom) || []
  const relatedProducts = allProducts.filter(
    (p) => p.category === product?.category && p.id !== product.id
  ).splice(0, limit)
  return arrayShuffle(relatedProducts)
}
