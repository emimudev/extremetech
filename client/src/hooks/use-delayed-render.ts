import { useEffect, useState } from 'react'

export function useDelayedRender(delay = 200) {
  const [delayed, setDelayed] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (fn: any) => !delayed && fn()
}
