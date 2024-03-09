'use client'
import { FC } from 'react'
import { LeaderPersonalInfo } from '@/components/leader/LeaderPersonalInfo'

import { GeneralInfoBox } from '@/components/leader/GeneralInfoBox'
import { CitizenFollowingList } from '@/components/citizen/CitizenFollowingList'

const LeaderProfilePage: FC = () => {
  return (
    <div className='flex gap-5 w-full max-[900px]:flex-col'>
      <div className='w-[28%] max-[1500px]:w-[31%] max-[1250px]:w-[35%] max-[1130px]:w-[38%] max-[900px]:w-full'>
        <LeaderPersonalInfo />
      </div>

      <div className='flex-1 flex flex-col gap-5'>
        <GeneralInfoBox />
        {/* <CitizenFollowingList /> */}
      </div>
    </div>
  )
}

export default LeaderProfilePage
