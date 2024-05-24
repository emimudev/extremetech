import { ProductService } from '@/services/product-service'
import useSWR from 'swr'
import CarouselFluid from '../carousel-fluid'
import CarouselFluidItem from '../carousel-fluid/item'
import Product from '../product'

export default function BestOffersProducts() {
  const { data, error, isLoading, isValidating } = useSWR(
    'api/products/offers',
    () => ProductService.getOfferProducts().then((res) => res.content)
  )

  // console.log('offers', { data, error, isLoading, isValidating })

  if (isLoading) return <div>Loading...</div>

  if (!data) return null

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
