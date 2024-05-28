import { Brand } from '@/types'
import axios from 'axios'
import { AxiosAPIResponse, buildEndpoint } from './config'

async function getAll() {
  const response: AxiosAPIResponse<Brand[]> = await axios.get(
    buildEndpoint('brands/all')
  )
  return response.data.content
}

export const BrandsService = {
  getAll
}
