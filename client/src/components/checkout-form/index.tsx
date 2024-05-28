import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input, Textarea } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Glow from '../glow'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/use-cart'
import { OrdersService } from '@/services/orders-service'
import { OrderRequest } from '@/types/order-request'
import { OrderItemRequest } from '@/types/order-item-request'
import { useAuth } from '@/hooks/use-auth'

function checkIsVisa(cardNumber: string) {
  return cardNumber.match(/^4\d{12}(?:\d{3})?$/)
}

function checkIsMastercard(cardNumber: string) {
  return cardNumber.match(/^5[1-5]\d{14}$/)
}

function validateCreditCard(cardNumber: string) {
  const cleanedNumber = cardNumber.replace(/\D/g, '')
  const isVisa = checkIsVisa(cleanedNumber)
  const isMastercard = checkIsMastercard(cleanedNumber)
  const isAmex = cleanedNumber.match(/^3[47]\d{13}$/)
  const isValidLuhn = (num: string) => {
    let sum = 0
    for (let i = 0; i < num.length; i++) {
      let digit = parseInt(num[num.length - 1 - i])
      if (i % 2 === 1) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
    }
    return sum % 10 === 0
  }
  return (isVisa || isMastercard || isAmex) && isValidLuhn(cleanedNumber)
}

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  cardNumber: z.string().refine(validateCreditCard, {
    message: 'Enter a valid credit card number'
  }),
  cardHolderName: z.string().min(1, { message: 'Card holder is required' }),
  cvv: z
    .string()
    .min(3, { message: 'Enter a valid CVV' })
    .max(4, { message: 'Enter a valid CVV' }),
  expiry: z.string().min(1, { message: 'Expiry is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  provice: z.string().min(1, { message: 'Province is required' }),
  zipCode: z.string().min(1, { message: 'Zip code is required' })
})

export function CheckoutForm() {
  const { cart, mutate } = useCart()
  const { items } = cart
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      cardNumber: '',
      cardHolderName: user?.fullName,
      cvv: '',
      address: '',
      expiry: '',
      city: '',
      provice: '',
      zipCode: ''
    }
  })
  const [cardType, setCardType] = useState<
    'visa' | 'mastercard' | 'amex' | null
  >(null)
  const cardNumber = form.watch('cardNumber')
  const navigate = useNavigate()

  useEffect(() => {
    if (!cardNumber) return
    const cleanedNumber = cardNumber.replace(/\D/g, '')
    if (checkIsVisa(cleanedNumber)) {
      setCardType('visa')
      console.log('visa')
    } else if (checkIsMastercard(cleanedNumber)) {
      setCardType('mastercard')
      console.log('mastercard')
    } else if (cleanedNumber.match(/^3[47]\d{13}$/)) {
      setCardType('amex')
      console.log('amex')
    } else {
      setCardType(null)
    }
  }, [cardNumber])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })

    const order: OrderRequest = {
      orderInfo: {
        address: values.address,
        cardHolderName: values.cardHolderName,
        cardNumber: values.cardNumber,
        city: values.city,
        cvv: values.cvv,
        email: values.email,
        expiryDate: values.expiry,
        province: values.provice,
        zipCode: values.zipCode
      },
      items: items.map(({ product, quantity }) => {
        return {
          product,
          quantity
        } as OrderItemRequest
      })
    }

    OrdersService.createOrder(order)
      .then(() => {
        setOpen(true)
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  const handleCloseModal = () => {
    setOpen(false)
    mutate()
    navigate('/')
  }

  return (
    <div className='contents w-full border-none z-0'>
      <div className='min-w-[300px] -translate-x-1/3 w-full max-w-[700px] text-primary -top-[60%] absolute -z-[1]'>
        <Glow />
      </div>
      <div className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      variant='flat'
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
                        radius='sm'
                        placeholder='Enter your card number'
                        startContent={cardType || ' '}
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
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className='flex items-center gap-3'>
                    <div className='flex justify-between  items-center gap-3 w-full'>
                      <div className='text-sm font-semibold'>
                        {product.name}
                        <span className='ml-2 flex-[0_0_auto] text-foreground-strong px-3 mr-2 text-xs bg-blue-500/40 rounded-full'>
                          {quantity}
                        </span>
                      </div>
                      <p className='text-foreground flex-[0_0_auto] text-sm flex items-center gap-2 mb-2'>
                        ${product.price} x {quantity} = $
                        {product.price * quantity}
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
                  {items.reduce(
                    (acc, { product, quantity }) =>
                      acc + product.price * quantity,
                    0
                  )}
                </span>
              </div>
            </div>
            <Divider className='my-4'></Divider>
            <Button
              color='primary'
              type='submit'
              className='text-foreground-strong font-semibold bg-primary/70'
            >
              Complete Purchase
            </Button>
          </form>
        </Form>
      </div>
      <Dialog open={open} onOpenChange={handleCloseModal}>
        <DialogContent className='!rounded-3xl'>
          <div className='flex flex-col gap-4 items-center my-6'>
            <div className='text-foreground w-full text-center mt-6 flex flex-col'>
              <span className='text-lg lg:text-3xl '>
                Your purchase was successful
              </span>
              <span className='mt-2'>Thank you for shopping with us</span>
            </div>
            <Button
              onClick={handleCloseModal}
              size='md'
              radius='full'
              className='bg-primary/70 max-w-[80%] mt-3'
            >
              Continue shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
