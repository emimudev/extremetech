import { useJoinModalWrite } from '@/atoms'
import useAuth from './use-auth'

export interface UseAuthenticationActionProps<T extends (...args: any) => any> {
  action: () => ReturnType<T>
}

export default function useAuthenticatedAction<
  T extends (...args: any) => any
>(props: UseAuthenticationActionProps<T>) {
  const { isAuthenticated } = useAuth()
  const { openModal } = useJoinModalWrite()
  const { action } = props

  const handleAction = () => {
    if (!isAuthenticated) {
      openModal()
      return
    }
    action()
  }

  return handleAction
}
