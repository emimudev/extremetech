import useProductsFilters from '@/hooks/use-produts-filters'
import { Slider } from '@nextui-org/react'
import debounce from 'lodash.debounce'

export default function PriceFilter() {
  const { getMoreExpensiveProduct, getCheaperProduct, applyFilter } =
    useProductsFilters()

  const handleChange = debounce((values: number | number[]) => {
    if (typeof values === 'number') return
    const [minPrice, maxPrice] = values
    applyFilter((prev) => {
      window.scrollTo(0, 0)
      return {
        ...prev,
        price: {
          min: minPrice,
          max: maxPrice
        }
      }
    })
  }, 500)

  return (
    <Slider
      label='Price'
      minValue={getCheaperProduct().price}
      formatOptions={{ compactDisplay: 'short', currency: 'USD' }}
      maxValue={getMoreExpensiveProduct().price}
      onChange={handleChange}
      defaultValue={[
        getCheaperProduct().price,
        getMoreExpensiveProduct().price
      ]}
      classNames={{
        labelWrapper: 'pb-2 '
      }}
      size='sm'
    />
  )
}
