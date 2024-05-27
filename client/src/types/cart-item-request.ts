import { Product } from './product'

export interface CartItemRequest {
  product: Pick<Product, 'id'>
  quantity: number
}
