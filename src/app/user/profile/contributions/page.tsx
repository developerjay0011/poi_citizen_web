'use client'
import { ContributionPage } from '@/components/citizen/pages/ContributionPage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const CitizenContributionPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <div className='self-start max-[800px]:hidden'>
          <ShortcutsBox />
        </div>

        <ContributionPage />
      </section>
    </>
  )
}

export default CitizenContributionPage
