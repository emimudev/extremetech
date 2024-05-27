import useSWR from 'swr'
import CarouselFluid from '../carousel-fluid'
import CarouselFluidItem from '../carousel-fluid/item'
import Product from '../product'
import { ProductService } from '@/services/product-service'
import { Skeleton } from '@nextui-org/react'

export function RelatedProducts({ categoryCode }: { categoryCode: string }) {
  const { data } = useSWR([categoryCode, 'api/v1/products/related'], ([code]) =>
    ProductService.findProductsByCategory(code).then((res) => res.content)
  )
  const { results } = data ?? { results: new Array(8).fill(0) }

  return (
    <CarouselFluid>
      {data &&
        results.map((product, key) => (
          <CarouselFluidItem key={key} className='basis-1/3 xl:basis-1/5'>
            <Product product={product} />
          </CarouselFluidItem>
        ))}
      {!data && results.map((_, index) => (
        <CarouselFluidItem key={index} className='basis-1/3 xl:basis-1/5'>
          <Skeleton className='w-full h-[220px] rounded-xl' />
        </CarouselFluidItem>
      ))}
    </CarouselFluid>
  )
}
