import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import './App.css'
import AuthContextProvider from './context/auth-context'

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={AppRoutes} />
    </AuthContextProvider>
  )
}

export default App
