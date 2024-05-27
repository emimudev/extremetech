import { ProductService } from '@/services/product-service'
import useSWR from 'swr'
import CarouselFluid from '../carousel-fluid'
import CarouselFluidItem from '../carousel-fluid/item'
import Product from '../product'

export default function BestOffersProducts() {
  const { data, isLoading } = useSWR(
    'api/products/offers',
    () => ProductService.getOfferProducts().then((res) => res.content)
  )

  if (!data || isLoading) return null

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
