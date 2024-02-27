'use client'
import { CitizenFeed } from '@/components/citizen/CitizenFeed'
import { TimeLinePage } from '@/components/posts/TimeLinePage'
import { BriefProfileInfoBox } from '@/components/timlineComponents/BriefProfileInfoBox'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { TrendingLeaders } from '@/components/timlineComponents/trendingLeader/TrendingLeaders'
import { FC } from 'react'

const CitizenProfileFeedPage: FC = () => {
  return (
    <section className='w-full relative'>
      <div className='flex gap-5'>
        {/* LEFT FEED */}
        <div className='flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]'>
          <TrendingLeaders />
          <ShortcutsBox />
        </div>

        {/* <CitizenFeed /> */}
        <TimeLinePage />

        {/* RIGHT FEED */}
        <div className='flex flex-col self-start gap-5 max-[1200px]:hidden'>
          <BriefProfileInfoBox />
        </div>
      </div>
    </section>
  )
}

export default CitizenProfileFeedPage
