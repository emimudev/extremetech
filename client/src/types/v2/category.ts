import { Attribute } from './attribute'

export interface Category {
  id: number
  code: string
  name: string
  attributes: Attribute[]
}
