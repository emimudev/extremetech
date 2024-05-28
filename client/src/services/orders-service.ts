import { OrderRequest } from '@/types/order-request'
import { AxiosAPIResponse, buildEndpoint, securedAPI } from './config'
import { Order } from '@/types/order'
import { PageResult } from '@/types'

async function getOrder(orderId: string | number) {
  const response: AxiosAPIResponse<Order> = await securedAPI.get(
    buildEndpoint(`shopping-order/${Number(orderId)}`)
  )
  return response.data
}

async function getOrders(page: number = 1, size: number = 10) {
  const response: AxiosAPIResponse<PageResult<Order>> = await securedAPI.get(
    buildEndpoint(`shopping-order/admin?page=${page}&size=${size}`)
  )
  return response.data
}

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

async function updateOrderStatus(orderId: string, status: string) {
  const response: AxiosAPIResponse<Order> = await securedAPI.post(
    buildEndpoint(`shopping-order/${orderId}/status`),
    {
      status
    }
  )
  return response
}

export const OrdersService = {
  getOrder,
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus
}
