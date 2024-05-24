import { useEffect, useState, useRef } from 'react'

export type MediaScreenRule = 'min' | 'max'

const useMatchMedia = (width = 600, rule: MediaScreenRule = 'min'): boolean => {
  const [toggleChange, setToggleChange] = useState<boolean>(false)
  const matchMediaRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    matchMediaRef.current = window.matchMedia(`(${rule}-width: ${width}px)`)
    const initialMatch = matchMediaRef.current.matches

    if (initialMatch) {
      setToggleChange(true)
    } else {
      setToggleChange(false)
    }

    const test = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setToggleChange(true)
      } else {
        setToggleChange(false)
      }
    }

    matchMediaRef.current.addEventListener('change', test)

    return () => {
      matchMediaRef.current?.removeEventListener('change', test)
    }
  }, [width, rule])

  return toggleChange
}

export default useMatchMedia
