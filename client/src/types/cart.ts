import { CartItem } from './cart-item'
import { User } from './user'

export interface Cart {
  id: string
  owner: User
  items: CartItem[]
}
