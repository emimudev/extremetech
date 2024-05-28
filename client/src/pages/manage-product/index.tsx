import { useParams } from 'react-router-dom'

export default function ManageProductPage() {
  const params = useParams()
  const productCode = params.productCode
}
