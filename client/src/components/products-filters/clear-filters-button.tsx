import useProductsFilters from '@/hooks/use-produts-filters'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export default function ClearFiltersButton() {
  const { clearFilters, hasAnyFilter } = useProductsFilters()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/products')
    clearFilters()
  }

  return (
    <Button
      className='w-full mt-2 dark:bg-white/10 text-foreground  font-semibold text-sm'
      size='sm'
      color='default'
      isDisabled={!hasAnyFilter()}
      onClick={handleClick}
    >
      Clear filters
    </Button>
  )
}
