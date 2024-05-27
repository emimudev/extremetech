import { WishList } from '@/types/wish-list'
import { AxiosAPIResponse, buildEndpoint, securedAPI } from './config'
import { Product } from '@/types'

async function getMyWishList() {
  const response: AxiosAPIResponse<WishList> = await securedAPI.get(
    buildEndpoint('wishlist')
  )
  return response.data
}

async function addItem(product: Product) {
  const response: AxiosAPIResponse<WishList> = await securedAPI.post(
    buildEndpoint('wishlist/add/item'),
    product
  )
  return response.data
}

async function removeItem(product: Product) {
  const response: AxiosAPIResponse<WishList> = await securedAPI.post(
    buildEndpoint('wishlist/remove/item'),
    product
  )
  return response.data
}

export const WishListService = {
  getMyWishList,
  addItem,
  removeItem
}
