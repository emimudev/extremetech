import { Button } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'

const ignoreParams = ['page', 'size']

export default function ClearFiltersButton() {
  // const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const hasAnyFilter = () => {
    let hasFilter = false
    searchParams.forEach((_, key) => {
      if (ignoreParams.includes(key)) return
      hasFilter = true
    })
    return hasFilter
  }

  const clearFilters = () => {
    const keysToDelete: string[] = []
    searchParams.forEach((_, key) => {
      console.log('param', { key })
      if (ignoreParams.includes(key)) return
      keysToDelete.push(key)
    })
    keysToDelete.forEach((key) => {
      searchParams.delete(key)
    })
    setSearchParams(searchParams)
  }

  const handleClick = () => {
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
