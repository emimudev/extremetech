import { OrderInfo } from './order-info'
import { OrderItem } from './order-item'
import { ShoppingOrderStatus } from './order-request'
import { User } from './user'

export interface Order {
  id: string
  orderedDate: string
  updatedDate: string
  customer: User
  items: OrderItem[]
  totalAmount: number
  status: ShoppingOrderStatus
  orderInfo: OrderInfo
}
