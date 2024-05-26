import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import { LoginModal } from '../login-modal'
import MobileNavbar from '../mobile-navbar'
import { Toaster } from '@/components/ui/sonner'

export default function Layout() {
  return (
    <div className='[--navbar-height:3rem] lg:[--navbar-height:4rem] pb-12 md:pb-0'>
      <Navbar />
      <main className='min-h-[100vh] pt-[var(--navbar-height)]'>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <MobileNavbar />
      <LoginModal />
      <Toaster />
    </div>
  )
}
