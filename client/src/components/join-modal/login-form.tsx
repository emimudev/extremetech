import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Button, Divider, Input } from '@nextui-org/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/v2/use-auth'
import { APIResponse } from '@/types/v2'
import { zodResolver } from '@hookform/resolvers/zod'
import { useJoinModalWrite } from '@/atoms/join-modal'

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export function LoginForm() {
  const { login } = useAuth()
  const { closeModal } = useJoinModalWrite()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
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
  )
}
