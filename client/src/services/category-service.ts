import { Category } from '@/types'
import axios from 'axios'
import { AxiosAPIResponse, buildEndpoint } from './config'

async function getAll() {
  const response: AxiosAPIResponse<Category[]> = await axios.get(
    buildEndpoint('category/all')
  )
  return response.data.content
}

export const CategoryService = {
  getAll
}
