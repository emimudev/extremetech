import { useJoinModalWrite } from '@/atoms/join-modal-atom'
import { useAuth } from '@/hooks/use-auth'
import { APIResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input } from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'

const formSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    lastname: z.string().min(1, { message: 'Lastname is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export function SignupForm() {
  const { signup } = useAuth()
  const { closeModal } = useJoinModalWrite()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastname: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, lastname, name } = values
    setIsLoading(true)
    signup({ email, password, lastname, name })
      .then(() => {
        // console.log('SignupResponse ', res)
        closeModal()
      })
      .catch((err: APIResponse<null>) => {
        if (err.statusCode === 409) {
          form.setError('email', { message: 'This email is already in use' })
        } else {
          form.setError('email', { message: 'An error occurred. Please try again later' })
        }
      })
      .finally(() => setIsLoading(false))
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
                  isDisabled={isLoading}
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
                  isDisabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  autoComplete='off'
                  variant='faded'
                  placeholder='Confirm your password'
                  isDisabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  variant='faded'
                  placeholder='Enter your name'
                  isDisabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input
                  variant='faded'
                  placeholder='Enter your lastname'
                  isDisabled={isLoading}
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
          className='w-full font-semibold'
          isLoading={isLoading}
        >
          Create account
        </Button>
      </form>
    </Form>
  )
}
