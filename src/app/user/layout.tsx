'use client'
import { FC, ReactNode } from 'react'
import { LeftNavbar } from '@/components/LeftNavbar'
import { RightNavbar } from '@/components/RightNavbar'
import { TopNavbar } from '@/components/TopNavbar'
import Notificationpage from '@/utils/firebase/notification'

const CitizenLayout: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <>
      <main className='flex flex-col h-[100dvh] overflow-hidden'>
        <TopNavbar />
        <div className='flex flex-grow overflow-y-scroll scroll_hidden'>
          <LeftNavbar />
          <section className='bg-zinc-100 flex-1 overflow-y-scroll main_scrollbar'>
            <section className='m-auto my-10 w-[75%] overflow-y-scroll main_scrollbar flex flex-col gap-8 max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
              {children}
            </section>
          </section>
          <RightNavbar />
        </div>
        <Notificationpage />
      </main>
    </>
  )
}

export default CitizenLayout
