import { useMediaQuery } from './use-media-query'

export default function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)')
}
