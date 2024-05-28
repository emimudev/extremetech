import { useJoinModalWrite } from '@/atoms/join-modal-atom'
import { useAuth } from '@/hooks/use-auth'
import { APIResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input } from '@nextui-org/react'
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
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

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

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

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
                  type={isVisible ? 'text' : 'password'}
                  autoComplete='current-password'
                  variant='faded'
                  placeholder='Enter your password'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibility}
                    >
                      {/* eslint-disable-next-line multiline-ternary */}
                      {isVisible ? (
                        <EyeIcon className='h-4 w-4 text-default-400 pointer-events-none' />
                      ) : (
                        <EyeOffIcon className='h-4 w-4 text-default-400 pointer-events-none' />
                      )}
                    </button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Divider className='!mt-5' />
        <Button type='submit' color='primary' className='w-full font-semibold'>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
