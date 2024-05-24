import { PageResult, Product } from '@/types/v2'
import { AxiosAPIResponse, buildEndpoint } from './config'
import axios from 'axios'

async function getFeaturedProducts(page: number = 1, size: number = 10) {
  console.log('getFeaturedProducts()')
  const response: AxiosAPIResponse<PageResult<Product>> = await axios.get(
    buildEndpoint(`products/featured?page=${page}&size=${size}`)
  )
  return response.data
}

async function getOfferProducts(page: number = 1, size: number = 10) {
  const response: AxiosAPIResponse<PageResult<Product>> = await axios.get(
    buildEndpoint(`products/offers?page=${page}&size=${size}`)
  )
  return response.data
}

export const ProductService = {
  getFeaturedProducts,
  getOfferProducts
}
