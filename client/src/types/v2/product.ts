import { Brand } from './brand'
import { Category } from './category'
import { Attribute } from './attribute'
import { Offer } from './offer'

export interface Product {
  id: string
  code: string
  name: string
  description?: string | null
  price: number
  offer?: Offer | null
  brand: Brand
  category: Category
  stock: number
  images: string[]
  createdAt: string
  attributes: Attribute[]
  features: Record<string, string | number | string[]>
}
