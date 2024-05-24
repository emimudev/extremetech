import { ErrorField } from './error-field'

export interface ErrorResult<T = ErrorField> {
  errors: T[]
  message: string
  status: string
  statusCode: number
}
