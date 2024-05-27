import { Product } from './product'
import { User } from './user'

export interface WishList {
  id: string
  owner: User
  items: Product[]
  isPublic: boolean
}
