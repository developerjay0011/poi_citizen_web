'use client'
import { SuggestionPage } from '@/components/citizen/pages/SuggestionPage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const CitizenSuggestionPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <div className='self-start max-[800px]:hidden'>
          <ShortcutsBox />
        </div>
        <SuggestionPage />
      </section>
    </>
  )
}

export default CitizenSuggestionPage
