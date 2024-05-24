import { LoginRequest, LoginResponse, TokenResponse, User } from '@/types/v2'
import axios from 'axios'
import { AxiosAPIResponse, api, buildEndpoint } from './config'

async function login(loginRequest: LoginRequest) {
  const response: AxiosAPIResponse<LoginResponse> = await axios.post(
    buildEndpoint('auth/login'),
    loginRequest
  )
  // axios.defaults.headers.common.Authorization = `Bearer ${response.data.content?.token.accessToken}`
  setGlobalAccessToken(response.data.content?.token.accessToken)
  return response.data.content as LoginResponse
}

async function refreshToken() {
  const localAuthStr = localStorage.getItem('auth')
  if (!localAuthStr) throw new Error('No auth found in local storage')
  const localAuth = JSON.parse(localAuthStr) as LoginResponse
  const refreshToken = localAuth.token.refreshToken
  const response: AxiosAPIResponse<TokenResponse> = await axios.post(
    buildEndpoint('auth/refresh-token'),
    {
      token: refreshToken
    }
  )
  setGlobalAccessToken(response.data.content?.accessToken)
  localAuth.token = response.data.content as TokenResponse
  localStorage.setItem('auth', JSON.stringify(localAuth))
  return localAuth
}

async function me() {
  const response: AxiosAPIResponse<User> = await axios.get(
    buildEndpoint('users/me')
  )
  return response.data
}

export function setGlobalAccessToken(token?: string) {
  if (!token) return
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const AuthService = {
  login,
  refreshToken,
  me
}
