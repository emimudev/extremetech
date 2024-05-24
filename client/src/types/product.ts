export interface IProduct {
  id: number | string
  name: string
  description?: string
  price: number
  offer?: {
    discount: number
    expiresAt?: string
  }
  images: string[]
  category: string
  brand: string
  rating?: number
  numReviews?: number
  stock: number
  createdAt?: string
  updatedAt?: string
  features: Record<string, string|number|string[]>
}
