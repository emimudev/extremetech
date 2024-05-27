import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import RouterRoot from './router-root'

const ProductsPage = lazy(() => import('@/pages/products'))
const HomePage = lazy(() => import('@/pages/home'))
const Layout = lazy(() => import('@/components/layout'))
const ProductDetails = lazy(() => import('@/pages/product-details'))
const ClientSettingsPage = lazy(() => import('@/pages/client-settings'))
const ClientProfilePage = lazy(() => import('@/pages/client-profile'))
const ShoppingCartPage = lazy(() => import('@/pages/shopping-cart'))

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RouterRoot />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'products/:categoryCode',
            index: true,
            element: <ProductsPage />
          },
          {
            path: 'products/:categoryCode/:productCode',
            element: <ProductDetails />
          },
          { path: 'cart', element: <ShoppingCartPage /> },
          // { path: 'checkout', element: <CheckoutPage /> },
          {
            path: 'me',
            element: <ClientSettingsPage />,
            children: [
              {
                path: '/me',
                element: <ClientProfilePage />
              }
            ]
          },
          { path: '*', element: <Navigate to={'/'}></Navigate> }
        ]
      }
    ]
  }
])
