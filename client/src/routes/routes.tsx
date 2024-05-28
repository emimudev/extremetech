import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import RouterRoot from './router-root'
import { AuthenticatedRoute } from '@/components/authenticated-route'
import Layout from '@/components/layout'

const ProductsPage = lazy(() => import('@/pages/products'))
const HomePage = lazy(() => import('@/pages/home'))
const ProductDetails = lazy(() => import('@/pages/product-details'))
const ClientSettingsPage = lazy(() => import('@/pages/client-settings'))
const ClientProfilePage = lazy(() => import('@/pages/client-profile'))
const ShoppingCartPage = lazy(() => import('@/pages/shopping-cart'))
const WishListPage = lazy(() => import('@/pages/wish-list'))
const CheckoutPage = lazy(() => import('@/pages/checkout'))
const ClientOrdersPage = lazy(() => import('@/pages/client-orders'))

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
          { path: 'checkout', element: <CheckoutPage /> },
          {
            path: 'me',
            element: (
              <AuthenticatedRoute>
                <ClientSettingsPage />
              </AuthenticatedRoute>
            ),
            children: [
              {
                path: '/me',
                element: <ClientProfilePage />
              },
              {
                path: '/me/wishlist',
                element: <WishListPage />
              },
              {
                path: '/me/orders',
                element: <ClientOrdersPage />
              }
            ]
          },
          { path: '*', element: <Navigate to={'/'}></Navigate> }
        ]
      }
    ]
  }
])
