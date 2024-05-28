import { Order } from '@/types/order'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Divider, Input, Textarea } from '@nextui-org/react'

export interface OrderFormProps {
  order: Order
}

export function OrderForm({ order }: OrderFormProps) {
  const form = useForm({
    defaultValues: {
      email: order?.customer?.email,
      cardNumber: order.orderInfo.cardNumber,
      cardHolderName: order.orderInfo.cardHolderName,
      cvv: order.orderInfo.cvv,
      address: order.orderInfo.address,
      expiry: order.orderInfo.expiryDate,
      city: order.orderInfo.city,
      provice: order.orderInfo.province,
      zipCode: order.orderInfo.zipCode
    }
  })

  return (
    <Form {...form}>
      <form className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  variant='flat'
                  isReadOnly
                  type='email'
                  radius='sm'
                  placeholder='m@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cardHolderName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on card</FormLabel>
              <FormControl>
                <Input
                  variant='flat'
                  isReadOnly
                  radius='sm'
                  placeholder='Enter the name on your card'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid gap-3 grid-cols-2 sm:grid-cols-5'>
          <FormField
            control={form.control}
            name='cardNumber'
            render={({ field }) => (
              <FormItem className='col-span-full sm:col-span-3'>
                <FormLabel>Card number</FormLabel>
                <FormControl>
                  <Input
                    variant='flat'
                    isReadOnly
                    radius='sm'
                    placeholder='Enter your card number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cvv'
            render={({ field }) => (
              <FormItem className='col-span-1 sm:col-span-1'>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    variant='flat'
                    isReadOnly
                    radius='sm'
                    placeholder='777'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='expiry'
            render={({ field }) => (
              <FormItem className='col-span-1 sm:col-span-1'>
                <FormLabel>Expiry</FormLabel>
                <FormControl>
                  <Input
                    variant='flat'
                    isReadOnly
                    radius='sm'
                    placeholder='16/26'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='col-span-1 sm:col-span-1'>
              <FormLabel>Billing Address</FormLabel>
              <FormControl>
                <Textarea
                  isReadOnly
                  variant='flat'
                  radius='sm'
                  // autoComplete='username'
                  placeholder='Enter your billing address'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='col-span-1 xs:col-span-1'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    isReadOnly
                    variant='flat'
                    radius='sm'
                    // autoComplete='username'
                    placeholder='Enter a city'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='provice'
            render={({ field }) => (
              <FormItem className='col-span-1 xs:col-span-1'>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    isReadOnly
                    variant='flat'
                    radius='sm'
                    // autoComplete='username'
                    placeholder='Enter a province'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='zipCode'
            render={({ field }) => (
              <FormItem className='col-span-1 sm:col-span-1'>
                <FormLabel>Zip code</FormLabel>
                <FormControl>
                  <Input
                    isReadOnly
                    variant='flat'
                    radius='sm'
                    // autoComplete='username'
                    placeholder='Enter a province'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Divider></Divider>
        <div className='text-lg'>Purchase Summary</div>
        <div className='flex flex-col'>
          <ul className='flex flex-col'>
            {order.items.map(({ product, quantity }) => (
              <li key={product.id} className='flex items-center gap-3'>
                <div className='flex justify-between  items-center gap-3 w-full'>
                  <div className='text-sm font-semibold'>
                    {product.name}
                    <span className='ml-2 flex-[0_0_auto] text-foreground-strong px-3 mr-2 text-xs bg-blue-500/40 rounded-full'>
                      {quantity}
                    </span>
                  </div>
                  <p className='text-foreground flex-[0_0_auto] text-sm flex items-center gap-2 mb-2'>
                    ${product.price} x {quantity} = ${product.price * quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Divider className='my-4'></Divider>
          <div className='flex gap-2 text-foreground-strong text-right w-full justify-end'>
            Total:
            <span className='text-foreground'>
              $
              {order.items.reduce(
                (acc, { product, quantity }) => acc + product.price * quantity,
                0
              )}
            </span>
          </div>
        </div>
      </form>
    </Form>
  )
}
