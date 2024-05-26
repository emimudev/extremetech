import {
  FindProductsByFiltersParams,
  ProductService
} from '@/services/product-service'
import { PageResult, Product } from '@/types/v2'
import { KeyValuePair } from '@/types/v2/key-value-pair'
import { createContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSWR, { type SWRResponse } from 'swr'

export interface ProductsContextType
  extends SWRResponse<PageResult<Product> | undefined> {
  // filters: Record<string, string[]>
}

const INITIAL_PAGE = 1
const INITIAL_PAGE_SIZE = 10

export const ProductsContext = createContext<ProductsContextType>({
  data: undefined,
  error: undefined,
  isLoading: false,
  // filters: {},
  isValidating: false,
  mutate: () => Promise.resolve(undefined)
})

const ignoreKnownParams = ['page', 'size', 'brand']

export default function ProductsContextProvider({
  children,
  categoryCode
}: {
  children?: React.ReactNode
  categoryCode: string
}) {
  const [searchParams] = useSearchParams()
  const brands = searchParams.getAll('brand') ?? undefined
  const currentPage = searchParams.get('page') ?? INITIAL_PAGE
  const currentPageSize = searchParams.get('size') ?? INITIAL_PAGE_SIZE
  const filtersQuery: KeyValuePair[] = []

  // console.log({ categoryCode })

  // console.log(Array.from(searchParams.entries()))

  searchParams.forEach((value, key) => {
    if (ignoreKnownParams.includes(key)) return
    filtersQuery.push({ key, value })
    console.log({ key, value })
  })

  const queryParams: FindProductsByFiltersParams = {
    categoryCode,
    page: Number(currentPage),
    size: Number(currentPageSize),
    brands,
    filters: filtersQuery
  }

  const { data, ...swrProps } = useSWR(
    [queryParams, '/api/v1/products/filter'],
    ([params]) =>
      ProductService.findProductsByFilters(params).then((res) => res.content)
  )

  // const filters = useMemo(() => {
  //   const filters: Record<string, string[]> = {}
  //   if (!data) return filters
  //   const { results } = data
  //   const allAttributes = results.flatMap((product) => product.attributes)
  //   const allBrands = results.map((product) => product.brand)
  //   console.log({ allAttributes })
  //   if (!filters.Brands) {
  //     filters.Brands = []
  //   }
  //   allBrands.forEach((brand) => {
  //     if (!filters.Brands.includes(brand.name)) {
  //       filters.Brands.push(brand.name)
  //     }
  //   })
  //   allAttributes.forEach((productAttribute) => {
  //     const { attribute, value } = productAttribute
  //     const { name } = attribute
  //     if (!filters[name]) {
  //       filters[name] = []
  //     }
  //     if (!filters[name].includes(value)) {
  //       filters[name].push(value)
  //     }
  //   })
  //   return filters
  // }, [data])

  console.log('ProductsContext:', { data })

  return (
    <ProductsContext.Provider value={{ data, ...swrProps }}>
      {children}
    </ProductsContext.Provider>
  )
}
