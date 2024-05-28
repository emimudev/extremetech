import { Cart, CartItem } from '@/types'
import { CartItemRequest } from '@/types/cart-item-request'
import { AxiosAPIResponse, buildEndpoint, securedAPI } from './config'

async function getMyCart() {
  const response: AxiosAPIResponse<Cart> = await securedAPI.get(
    buildEndpoint('cart')
  )
  return response.data
}

async function add(items: CartItemRequest[]) {
  const response: AxiosAPIResponse<CartItem[]> = await securedAPI.post(
    buildEndpoint('cart/items'),
    items
  )
  return response.data
}

async function addOne(item: CartItemRequest) {
  const response: AxiosAPIResponse<CartItem[]> = await securedAPI.post(
    buildEndpoint('cart/add/item'),
    item
  )
  return response.data
}

async function removeOne(item: CartItem) {
  const response: AxiosAPIResponse<null> = await securedAPI.post(
    buildEndpoint(`cart/removeOne/${item.id}`)
  )
  return response.data
}

async function clear() {
  const response: AxiosAPIResponse<Cart> = await securedAPI.get(
    buildEndpoint('cart/clean')
  )
  return response.data
}

export const CartService = {
  getMyCart,
  add,
  addOne,
  removeOne,
  clear
  // removeItem
}
