import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import Navbar from './navbar'
import { Suspense } from 'react'
import { AsideOptions } from './aside-options'

export function AdminLayout() {
  return (
    <div className='min-h-screen overflow-hidden'>
      <header className='flex items-center bg-background/60 backdrop-blur-lg shadow-sm border-b-1 fixed z-10 top-0 left-0 right-0 h-12 lg:h-14'>
        <Navbar />
      </header>
      <aside className='bg-background border-r-1 hidden lg:block fixed z-10 top-14 left-0 bottom-0 w-full max-w-[13rem]'>
        <ScrollArea className='h-full overflow-y-auto'>
          <div className='px-3'>
            <div className='my-4 flex items-center justify-center py-2.5 rounded-xl bg-emerald-900/10 text-emerald-200 text-xs'>
              ADMINISTRATOR
            </div>
          </div>
          <AsideOptions />
        </ScrollArea>
      </aside>
      <main className='lg:pl-[13rem] pt-12 lg:pt-14'>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}
