'use client'
import { FC } from 'react'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { ComplaintPage } from '@/components/citizen/pages/CompaintPage'

const CitizenProfileComplaintsPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <div className='self-start max-[900px]:hidden'>
          <ShortcutsBox />
        </div>

        <div className='flex-grow self-start'>
          <ComplaintPage />
        </div>
      </section>
    </>
  )
}

export default CitizenProfileComplaintsPage
