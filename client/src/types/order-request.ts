import { OrderInfoRequest } from './order-info-request'
import { OrderItemRequest } from './order-item-request'

export type ShoppingOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export interface OrderRequest {
  items: OrderItemRequest[]
  orderInfo: OrderInfoRequest
}
