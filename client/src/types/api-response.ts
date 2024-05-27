export interface APIResponse<T> {
  content?: T
  message: string
  status: string
  statusCode: number
}
