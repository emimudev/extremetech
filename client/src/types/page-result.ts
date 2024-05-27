export interface PageResult<T> {
  page: number
  pageSize: number
  totalElements: number
  totalPages: number
  offset: number
  hasNext: boolean
  hasPrevious: boolean
  results: T[]
}
