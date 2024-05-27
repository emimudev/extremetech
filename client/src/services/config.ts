import { LoginResponse } from '@/types'
import { APIResponse } from '@/types/api-response'
import axios, { AxiosResponse } from 'axios'

export const securedAPI = axios.create()

securedAPI.interceptors.request.use(
  async (config) => {
    // console.log('Intercepting request....')
    // console.log('Getting localAuth....')
    const authLocalStr = localStorage.getItem('auth')
    if (authLocalStr) {
      const auth: LoginResponse = JSON.parse(authLocalStr)
      // console.log({ localAuth: auth })
      config.headers = {
        Authorization: `Bearer ${auth.token.accessToken}`,
        Accept: 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
      } as any
    }
    return config
  },
  (error) => Promise.reject(error)
)

export function setGlobalAccessToken(token?: string) {
  if (!token) return
  securedAPI.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const API_VERSION = 'v1'
export const PORT = 8080
export const BASE_URL = `http://localhost:${PORT}/api/${API_VERSION}`
export const buildEndpoint = (path: string) => `${BASE_URL}/${path}`
export type AxiosAPIResponse<T> = AxiosResponse<APIResponse<T>>
