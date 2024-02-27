'use client'
import { FC } from 'react'
import { RequestPage } from '@/components/citizen/pages/RequestPage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'

const CitizenRequestPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <div className='self-start max-[800px]:hidden'>
          <ShortcutsBox />
        </div>

        <div className='flex-grow self-start'>
          <RequestPage />
        </div>
      </section>
    </>
  )
}

export default CitizenRequestPage
