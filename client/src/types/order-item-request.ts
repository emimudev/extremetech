import { Product } from './product'

export interface OrderItemRequest {
  product: Product
  quantity: number
}
