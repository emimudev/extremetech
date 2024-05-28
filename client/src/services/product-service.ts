import { PageResult, Product } from '@/types'
import { KeyValuePairList } from '@/types/key-value-pair-list'
import { ProductFiltersRequest } from '@/types/product-filters-request'
import { ProductFiltersResponse } from '@/types/product-filters-response'
import axios from 'axios'
import { AxiosAPIResponse, buildEndpoint, securedAPI } from './config'
import { ProductRequest } from '@/types/product-request'

export interface FindProductsByFiltersParams {
  categoryCode: string
  page?: number
  size?: number
  brands?: string[]
  filters?: KeyValuePairList[]
}

export type GetProductFiltersParams = Omit<
  FindProductsByFiltersParams,
  'page' | 'size'
>

async function findByCode(code: string) {
  const response: AxiosAPIResponse<Product> = await axios.get(
    buildEndpoint(`products/${code}`)
  )
  return response.data
}

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

async function getFilters(params: GetProductFiltersParams) {
  const { categoryCode, brands = [], filters = [] } = params
  const filtersPayLoad: ProductFiltersRequest = {
    categoryCode,
    brands,
    filters
  }
  const response: AxiosAPIResponse<ProductFiltersResponse> = await axios.post(
    buildEndpoint('attribute/filters'),
    filtersPayLoad
  )
  return response.data
}

async function getProducts(page: number = 1, size: number = 10) {
  const response: AxiosAPIResponse<PageResult<Product>> = await axios.get(
    buildEndpoint(`products?page=${page}&size=${size}`)
  )
  return response.data
}

async function createProduct(product: ProductRequest) {
  const response: AxiosAPIResponse<Product> = await securedAPI.post(
    buildEndpoint('products'),
    product
  )
  return response.data
}

export const ProductService = {
  getFeaturedProducts,
  getOfferProducts,
  findProductsByCategory,
  findProductsByFilters,
  getFilters,
  findByCode,
  getProducts,
  createProduct
}
