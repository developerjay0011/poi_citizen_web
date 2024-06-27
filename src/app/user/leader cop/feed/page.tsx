'use client'
import { LeaderTimeLinePage } from '@/components/leader/TimeLinePage'
import { TimeLinePage } from '@/components/posts/TimeLinePage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const CitizenProfileFeedPage: FC = () => {
  return (
    <section className='w-full relative'>
      <div className='flex gap-5'>
        {/* LEFT FEED */}
        <div className='flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]'>
          <ShortcutsBox />
        </div>

        {/* LeaderFeed  */}

        <LeaderTimeLinePage/>
      
      </div>
    </section>
  )
}

export default CitizenProfileFeedPage
