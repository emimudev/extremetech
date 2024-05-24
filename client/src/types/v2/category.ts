import { Attribute } from './attribute'

export interface Category {
  id: string
  code: string
  name: string
  attributes: Attribute[]
}
