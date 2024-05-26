import { Brand } from './brand'
import { Category } from './category'
import { Offer } from './offer'
import { AttributeValue } from './attribute-value'

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
  attributes: AttributeValue[]
  features: Record<string, string | number | string[]>
}
