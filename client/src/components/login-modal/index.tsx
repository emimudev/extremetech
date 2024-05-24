import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLoginModal, useLoginModalWrite } from '@/atoms/login-modal'
import { Button, Divider, Input } from '@nextui-org/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import Glow from '../glow'
import { useAuth } from '@/hooks/v2/use-auth'
import { APIResponse } from '@/types/v2'

export interface LoginModalProps {}

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export function LoginForm() {
  // const { login } = useAuth()
  const { login } = useAuth()
  const { closeModal } = useLoginModalWrite()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    console.log({ values })
    // const newUser: IUser = {
    //   id: crypto.randomUUID(),
    //   name: 'User Name Placeholder',
    //   role: 'user',
    //   email
    // }
    login({ email, password })
      .then(() => {
        closeModal()
      })
      .catch((err: APIResponse<null>) => {
        console.log({ err })
        if (err.statusCode === 404) {
          form.setError('email', {
            message: 'User not found. Incorrect email or password'
          })
        } else {
          form.setError('email', {
            message: 'An error occurred. Please try again later'
          })
        }
        console.error({ err })
      })
  }

  return (
    <Card className='relative w-full border-none bg-background z-0'>
      <div className='min-w-[300px] left-1/2 -translate-x-1/2 w-full max-w-[600px] text-primary -top-1/3 absolute -z-[1]'>
        <Glow />
      </div>
      <CardHeader className='flex flex-col gap-3'>
        <div className='flex text-3xl self-center items-center gap-6 w-fit flex-grow-0 flex-shrink-0 mr-4'>
          <span className='font-semibold text-inherit w-fit text-nowrap gap-1'>
            Extreme
            <span className='dark:text-rose-400 text-rose-700'>Tech</span>
          </span>
        </div>
        <Divider />
        <CardTitle className='text-xl mb-3'>Login</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      variant='faded'
                      autoComplete='username'
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      autoComplete='current-password'
                      variant='faded'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Divider className='!mt-5' />
            <Button
              type='submit'
              color='primary'
              className='w-full font-semibold !mt-5'
            >
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export function LoginModal() {
  const { isOpen, setIsOpenModal } = useLoginModal()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpenModal}>
        <DialogContent className='overflow-hidden sm:max-w-[425px] focus-visible:outline-none dark:border-white/20 !rounded-3xl'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      shouldScaleBackground={false}
      open={isOpen}
      onOpenChange={setIsOpenModal}
    >
      <DrawerContent className='px-4 overflow-hidden'>
        <LoginForm />
      </DrawerContent>
    </Drawer>
  )
}
