import { LoginRequest, LoginResponse, SignupRequest, TokenResponse, User } from '@/types/v2'
import axios from 'axios'
import { AxiosAPIResponse, buildEndpoint, securedAPI, setGlobalAccessToken } from './config'

async function login(loginRequest: LoginRequest) {
  const response: AxiosAPIResponse<LoginResponse> = await axios.post(
    buildEndpoint('auth/login'),
    loginRequest
  )
  setGlobalAccessToken(response.data.content?.token.accessToken)
  return response.data.content as LoginResponse
}

async function signup(signupRequest: SignupRequest) {
  const response: AxiosAPIResponse<LoginResponse> = await axios.post(
    buildEndpoint('auth/signup'),
    signupRequest
  )
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
  const response: AxiosAPIResponse<User> = await securedAPI.get(
    buildEndpoint('users/me')
  )
  return response.data
}

export const AuthService = {
  login,
  signup,
  refreshToken,
  me
}
