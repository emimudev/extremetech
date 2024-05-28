import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import RouterRoot from './router-root'
import { AuthenticatedRoute } from '@/components/authenticated-route'
import Layout from '@/components/layout'
import { CreateProductPage } from '@/pages/create-product'
import { PrivateRoute } from '@/components/private-route'
import OrderPage from '@/pages/order-page'

const ProductsPage = lazy(() => import('@/pages/products'))
const HomePage = lazy(() => import('@/pages/home'))
const ProductDetails = lazy(() => import('@/pages/product-details'))
const ClientSettingsPage = lazy(() => import('@/pages/client-settings'))
const ClientProfilePage = lazy(() => import('@/pages/client-profile'))
const ShoppingCartPage = lazy(() => import('@/pages/shopping-cart'))
const WishListPage = lazy(() => import('@/pages/wish-list'))
const CheckoutPage = lazy(() => import('@/pages/checkout'))
const ClientOrdersPage = lazy(() => import('@/pages/client-orders'))
const ManageOrdersPage = lazy(() => import('@/pages/manage-orders'))

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
          {
            path: 'manage/product',
            element: (
              <PrivateRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                <CreateProductPage />
              </PrivateRoute>
            )
          },
          {
            path: 'manage/orders',
            element: (
              <PrivateRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                <ManageOrdersPage />
              </PrivateRoute>
            )
          },
          {
            path: 'orders/:orderId',
            element: <OrderPage />
          },
          { path: '*', element: <Navigate to={'/'}></Navigate> }
        ]
      }
    ]
  }
])
