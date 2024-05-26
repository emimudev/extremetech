import { useDelayedRender } from '@/hooks/use-delayed-render'

export interface DelayedRenderProps {
  delay?: number
  children: React.ReactNode
}

export function DelayedRender({ delay = 200, children }: DelayedRenderProps) {
  return useDelayedRender(delay)(() => children)
}
