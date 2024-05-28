import { useAuth } from '@/hooks/use-auth'
import { OrdersService } from '@/services/orders-service'
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { format, formatRelative } from 'date-fns'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useSWR from 'swr'

const chipColors = {
  PENDING: 'bg-slate-500/40 text-slate-200',
  CONFIRMED: 'bg-sky-600/40 text-sky-100',
  SHIPPED: 'bg-indigo-600/40 text-indigo-100',
  DELIVERED: 'bg-emerald-600/40 text-emerald-100',
  CANCELLED: 'bg-red-600/40 text-red-100'
}

export default function ClientOrdersPage() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useSWR(
    () => {
      if (!isAuthenticated) return null
      return [currentPage, '/api/v1/me/shopping-order']
    },
    async ([currentPage]) => {
      return OrdersService.getMyOrders(currentPage).then(
        (response) => response.content
      )
    },
    { keepPreviousData: true }
  )

  console.log({ data, isLoading })

  if (!data && !isLoading) return <Navigate to={'/'} />
  if (!isAuthenticated) return <Navigate to={'/'} />

  const pageResult = data!

  if (!pageResult) return null

  const { results: orders, page, totalPages } = pageResult

  const loadingState = isLoading || orders.length === 0 ? 'loading' : 'idle'

  return (
    <div className='flex flex-col pb-16 text-'>
      <h1 className='text-xl mb-8'>My Orders</h1>
      {/* {isLoading && !data && (

      )} */}
      <Table
        aria-label='Example static collection table'
        removeWrapper
        bottomContent={
          totalPages > 1 && (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>Order ID</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Ordered</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"You haven't placed any orders yet"}
          loadingState={loadingState}
        >
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                <Chip
                  size='sm'
                  className={chipColors[order.status]}
                  classNames={{ base: 'text-xs' }}
                >
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell title={format(order.orderedDate, 'dd/MM/yyyy')}>
                {formatRelative(order.orderedDate, new Date())
                  .charAt(0)
                  .toUpperCase() +
                  formatRelative(order.orderedDate, new Date()).slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
