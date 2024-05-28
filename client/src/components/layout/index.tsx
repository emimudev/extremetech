import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../footer'
import { JoinModal } from '../join-modal'
import MobileNavbar from '../mobile-navbar'
import Navbar from '../navbar'
import { Suspense } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { AdminLayout } from '../admin-layout'

export default function Layout() {
  const { isClient } = useAuth()

  if (!isClient) return <AdminLayout />

  return (
    <div className='[--navbar-height:3rem] lg:[--navbar-height:4rem] pb-12 md:pb-0'>
      <Navbar />
      <main className='min-h-[100vh] pt-[var(--navbar-height)]'>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
      <MobileNavbar />
      <JoinModal />
    </div>
  )
}
