import { useAuth } from '@/hooks/use-auth'
import { OrdersService } from '@/services/orders-service'
import {
  Link,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useState } from 'react'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import useSWR from 'swr'
import { chipColors } from '../client-orders'
import { format, formatRelative } from 'date-fns'

export default function ManageOrdersPage() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useSWR(
    () => {
      if (!isAuthenticated) return null
      return [currentPage, '/api/v1/admin/shopping-order']
    },
    async ([currentPage]) => {
      return OrdersService.getOrders(currentPage).then(
        (response) => response.content
      )
    },
    { keepPreviousData: true }
  )

  if (!isAuthenticated) return <Navigate to={'/'} />

  if (!data) return null

  const pageResult = data!

  const { results: orders, page, totalPages } = pageResult

  return (
    <div className='pb-14'>
      <div className='z-0 main-padding overflow-hidden relative min-h-20 flex items-center justify-between border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-rose-800/10 via-rose-950/10 to-indigo-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Manage Orders
        </h1>
      </div>
      <div className='main-padding !pt-5'>
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
            <TableColumn className='bg-content1/80 w-28'>Order ID</TableColumn>
            <TableColumn className='bg-content1/80'>Customer</TableColumn>
            <TableColumn className='bg-content1/80 w-36'>Status</TableColumn>
            <TableColumn className='bg-content1/80'>Total</TableColumn>
            <TableColumn className='bg-content1/80'>Ordered</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"There's no orders to show"}
            isLoading={isLoading}
          >
            {orders.map((order) => (
              <TableRow className='hover:bg-content1/40' key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Link as={RouterLink} to={`/orders/${order.id}`} className='text-emerald-400'>
                    {order.customer.fullName}
                  </Link>
                </TableCell>
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
    </div>
  )
}
