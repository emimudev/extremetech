import { Attribute } from './attribute'
import { Brand } from './brand'
import { Category } from './category'
import { Offer } from './offer'

export interface AttributeValueRequest {
  value: string
  attribute: Omit<Attribute, 'name' | 'isRequired'>
}

export interface ProductRequest {
  name: string
  description: string
  price: number
  offer: Omit<Offer, 'id'>
  brand: Omit<Brand, 'name'>
  category: Omit<Category, 'name' | 'attributes'>
  isOnSale: boolean
  stock: number
  images: string[]
  isFeatured: boolean
  // features: KeyValuePairList
  attributes: AttributeValueRequest[]
}
