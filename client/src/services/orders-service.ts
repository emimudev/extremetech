import { OrderRequest } from '@/types/order-request'
import { AxiosAPIResponse, buildEndpoint, securedAPI } from './config'
import { Order } from '@/types/order'
import { PageResult } from '@/types'

async function getMyOrders(page: number = 1, size: number = 10) {
  const response: AxiosAPIResponse<PageResult<Order>> = await securedAPI.get(
    buildEndpoint(`shopping-order?page=${page}&size=${size}`)
  )
  return response.data
}

async function createOrder(order: OrderRequest) {
  const response: AxiosAPIResponse<Order> = await securedAPI.post(
    buildEndpoint('shopping-order'),
    order
  )
  return response.data
}

export const OrdersService = {
  createOrder,
  getMyOrders
}
