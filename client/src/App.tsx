import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import AuthContextProvider from './context/auth-context'
import './App.css'

function App() {
  return (
    <Suspense>
      <AuthContextProvider>
        <RouterProvider router={AppRoutes} />
      </AuthContextProvider>
    </Suspense>
  )
}

export default App
