import { useJoinModal } from '@/atoms'
import { WishListService } from '@/services/wish-list-service'
import { Product } from '@/types'
import useSWR from 'swr'
import { useAuth } from './use-auth'
import { useCallback } from 'react'

export function useWishList() {
  const { openModal } = useJoinModal()
  const { isAuthenticated, isClient } = useAuth()
  const { data, mutate, ...response } = useSWR(
    () => {
      if (isAuthenticated && isClient) {
        return 'api/v1/wishlist'
      }
      return null
    },
    () => WishListService.getMyWishList().then((res) => res.content),
    { keepPreviousData: true }
  )

  const isProductInWishList = useCallback(
    (productId: string) => {
      if (!isAuthenticated) {
        return false
      }
      return data?.items.some((item) => item.id === productId) || false
    },
    [data, isAuthenticated]
  )

  const addToWishList = useCallback(
    async (product: Product) => {
      if (!isAuthenticated) {
        openModal()
        return
      }
      await WishListService.addItem(product).then((res) => {
        mutate(res.content!)
        return res
      })
    },
    [isAuthenticated, mutate, openModal]
  )

  const removeFromWishList = useCallback(
    async (product: Product) => {
      if (!isAuthenticated) {
        openModal()
        return
      }
      await WishListService.removeItem(product).then((res) => {
        mutate(res.content!)
        return res
      })
    },
    [isAuthenticated, mutate, openModal]
  )

  return {
    data,
    mutate,
    isProductInWishList,
    addToWishList,
    removeFromWishList,
    ...response
  }
}

export type WishListHook = ReturnType<typeof useWishList>
