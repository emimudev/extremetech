import { cn } from '@/lib/utils'
import { PageResult, Product } from '@/types'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { format, formatRelative } from 'date-fns'
import { Link } from 'react-router-dom'

export interface ProductsListProps {
  data: PageResult<Product> | undefined
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
  isLoading: boolean
}

export function ProductsList(props: ProductsListProps) {
  const { data, onPageChange, isLoading } = props

  return (
    <>
      <Table
        aria-label='Example static collection table'
        className='mt-6'
        removeWrapper
        bottomContent={
          data &&
          data.totalPages > 1 && (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                page={data.page}
                total={data.totalPages}
                onChange={onPageChange}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn className='bg-content1/80 w-24'>{null}</TableColumn>
          <TableColumn className='bg-content1/80'>Name</TableColumn>
          <TableColumn className='bg-content1/80'>Stock</TableColumn>
          <TableColumn className='bg-content1/80'>Category</TableColumn>
          <TableColumn className='bg-content1/80'>Price</TableColumn>
          <TableColumn className='bg-content1/80'>Added</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={'There are no products to display'}
          isLoading={isLoading}
        >
          {data
            ? data.results.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className='py-0.5'>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className='w-16 h-16 object-cover'
                    />
                  </TableCell>
                  <TableCell className='py-0.5'>
                    <Link to={`/products/${product.category.code}/${product.code}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className='py-0.5'>
                    <span
                      className={cn(
                        product.stock > 0 ? 'text-emerald-200' : 'text-rose-200'
                      )}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className='py-0.5'>
                    {product.category.name}
                  </TableCell>
                  <TableCell className='py-0.5'>${product.price}</TableCell>
                  <TableCell
                    className='py-0.5'
                    title={format(product.createdAt, 'dd/MM/yyyy')}
                  >
                    {formatRelative(product.createdAt, new Date())
                      .charAt(0)
                      .toUpperCase() +
                      formatRelative(product.createdAt, new Date()).slice(1)}
                  </TableCell>
                </TableRow>
                // eslint-disable-next-line indent
              ))
            : []}
        </TableBody>
      </Table>
    </>
  )
}
