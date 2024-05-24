import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout'
import HomePage from '@/pages/home'
import ProductsPage from '@/pages/products'
import ProductDetails from '@/pages/product-details'
import RouterRoot from './router-root'
import ShoppingCartPage from '@/pages/shopping-cart'
import CheckoutPage from '@/pages/checkout'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RouterRoot />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          // { path: 'products', index: true, element: <ProductsPage /> },
          // { path: 'products/:category/:id', element: <ProductDetails /> },
          // { path: 'cart', element: <ShoppingCartPage /> },
          // { path: 'checkout', element: <CheckoutPage /> },
          { path: '*', element: <Navigate to={'/'}></Navigate> }
        ]
      }
    ]
  }
])
