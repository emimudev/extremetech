import { useJoinModal } from '@/atoms/join-modal'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Divider, Tab, Tabs } from '@nextui-org/react'
import Glow from '../glow'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

export function ModalContent() {
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
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <Tabs aria-label='Join options' disableAnimation>
          <Tab key='loginForm' title='Sign in' className='w-full'>
            <LoginForm />
          </Tab>
          <Tab key='signupForm' title='Create Account' className='w-full'>
            <SignupForm />
          </Tab>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function JoinModal() {
  const { isOpen, setIsOpenModal } = useJoinModal()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpenModal}>
        <DialogContent className='overflow-hidden sm:max-w-[425px] focus-visible:outline-none dark:border-white/20 !rounded-3xl'>
          <ModalContent />
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
        <ModalContent />
      </DrawerContent>
    </Drawer>
  )
}
