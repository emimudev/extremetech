import { Suspense, lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import RouterRoot from './router-root'
import ShoppingCartPage from '@/pages/shopping-cart'
// import Layout from '@/components/layout'
// import HomePage from '@/pages/home'
// import ProductsPage from '@/pages/products'
// import ProductDetails from '@/pages/product-details'
// import ShoppingCartPage from '@/pages/shopping-cart'
// import CheckoutPage from '@/pages/checkout'

const ProductsPage = lazy(() => import('@/pages/products'))
const HomePage = lazy(() => import('@/pages/home'))
const Layout = lazy(() => import('@/components/layout'))
const ProductDetails = lazy(() => import('@/pages/product-details'))

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RouterRoot />,
    children: [
      {
        path: '',
        element: (
          <Suspense>
            <Layout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <HomePage />
              </Suspense>
            )
          },
          {
            path: 'products/:categoryCode',
            index: true,
            element: (
              <Suspense>
                <ProductsPage />
              </Suspense>
            )
          },
          {
            path: 'products/:categoryCode/:productCode',
            element: (
              <Suspense>
                <ProductDetails />
              </Suspense>
            )
          },
          { path: 'cart', element: <ShoppingCartPage /> },
          // { path: 'checkout', element: <CheckoutPage /> },
          { path: '*', element: <Navigate to={'/'}></Navigate> }
        ]
      }
    ]
  }
])
