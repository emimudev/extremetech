import { useAuth } from '@/hooks/use-auth'
import ManageProductsPage from '../manage-products'
import HomeClientPage from '../home-client'

export default function HomePage() {
  const { isClient } = useAuth()

  if (!isClient) return <ManageProductsPage />

  return (
    <HomeClientPage />
  )
}
