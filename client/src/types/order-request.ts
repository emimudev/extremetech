import { OrderInfoRequest } from './order-info-request'
import { OrderItemRequest } from './order-item-request'

export type ShoppingOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export const SHOPPING_ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
}

export interface OrderRequest {
  items: OrderItemRequest[]
  orderInfo: OrderInfoRequest
}
