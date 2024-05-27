import { useAuth } from '@/hooks/use-auth'
import { Input } from '@nextui-org/react'
import { formatRelative } from 'date-fns'

export default function ClientProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className='flex flex-col gap-6 pb-16'>
      <div className='flex flex-wrap gap-4'>
        <Input
          label='Name'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={user.name}
        />
        <Input
          label='Last Name'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={user.lastname}
        />
      </div>
      <div className='flex flex-wrap gap-4'>
        <Input
          label='Email'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={user.email}
        />
        <Input
          label='Joined'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={
            formatRelative(user.createdAt, new Date()).charAt(0).toUpperCase() +
            formatRelative(user.createdAt, new Date()).slice(1)
          }
        />
      </div>
      <div className='flex flex-wrap gap-4'>
        <Input
          label='Phone Number'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={' '}
        />
        <Input
          label='Province'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={' '}
        />
        <Input
          label='City'
          labelPlacement='outside'
          className='flex-[1_1_220px]'
          classNames={{
            inputWrapper: 'data-[hover]:!bg-default-100'
          }}
          isReadOnly
          value={' '}
        />
      </div>
    </div>
  )
}
