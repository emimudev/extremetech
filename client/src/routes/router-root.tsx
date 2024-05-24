import { NextUIProvider } from '@nextui-org/react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function RouterRoot() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <Outlet></Outlet>
    </NextUIProvider>
  )
}
