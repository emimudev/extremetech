import { ProductService } from '@/services/product-service'
import useSWR from 'swr'
import CarouselFluid from '../carousel-fluid'
import CarouselFluidItem from '../carousel-fluid/item'
import Product from '../product'

export default function FeaturedProducts() {
  const { data, error, isLoading, isValidating } = useSWR(
    'api/products/featured',
    () => ProductService.getFeaturedProducts().then((res) => res.content)
  )

  // console.log({ data, error, isLoading, isValidating })

  console.log({ error })

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>NO DATA</div>

  return (
    <CarouselFluid>
      {data.results.map((product, index) => (
        <CarouselFluidItem key={index}>
          <Product product={product}></Product>
        </CarouselFluidItem>
      ))}
    </CarouselFluid>
  )
}
