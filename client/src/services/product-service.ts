import { PageResult, Product } from '@/types/v2'
import { AxiosAPIResponse, buildEndpoint } from './config'
import axios from 'axios'
import { ProductFiltersRequest } from '@/types/v2/product-filters-request'
import { ProductFiltersResponse } from '@/types/v2/product-filters-response'
import { KeyValuePairList } from '@/types/v2/key-value-pair-list'

export interface FindProductsByFiltersParams {
  categoryCode: string
  page?: number
  size?: number
  brands?: string[]
  filters?: KeyValuePairList[]
}

export type GetProductFiltersParams = Omit<FindProductsByFiltersParams, 'page' | 'size'>

async function findProductsByFilters(params: FindProductsByFiltersParams) {
  const {
    categoryCode,
    brands = [],
    filters = [],
    page = 1,
    size = 10
  } = params
  const filtersPayLoad: ProductFiltersRequest = {
    categoryCode,
    brands,
    filters
  }
  const response: AxiosAPIResponse<PageResult<Product>> = await axios.post(
    buildEndpoint(`products/filter?page=${page}&size=${size}`),
    filtersPayLoad
  )
  return response.data
}

async function findProductsByCategory(
  category: string,
  page: number = 1,
  size: number = 10
) {
  const response: AxiosAPIResponse<PageResult<Product>> = await axios.get(
    buildEndpoint(`products/category/${category}?page=${page}&size=${size}`)
  )
  return response.data
}

async function getFeaturedProducts(page: number = 1, size: number = 10) {
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

async function getFilters(
  params: GetProductFiltersParams
) {
  const { categoryCode, brands = [], filters = [] } = params
  const filtersPayLoad: ProductFiltersRequest = {
    categoryCode,
    brands,
    filters
  }
  const response: AxiosAPIResponse<ProductFiltersResponse> =
    await axios.post(buildEndpoint('attribute/filters'), filtersPayLoad)
  return response.data
}

export const ProductService = {
  getFeaturedProducts,
  getOfferProducts,
  findProductsByCategory,
  findProductsByFilters,
  getFilters
}
