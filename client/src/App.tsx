import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import AuthContextProvider from './context/auth-context'
import './App.css'

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={AppRoutes} />
    </AuthContextProvider>
  )
}

export default App
