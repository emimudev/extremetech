import { cn } from '@/lib/utils'

export default function Spacer({ className = '' }) {
  return <div className={cn('flex-1', className)}></div>
}
