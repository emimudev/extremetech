import { TokenResponse } from './token-response'
import { User } from './user'

export interface LoginResponse {
  token: TokenResponse
  user: User
}
