'use client'
import { FC } from 'react'
import { CitizenPersonalInfo } from '@/components/citizen/CitizenPersonalInfo'
import { CitizenMoreInfo } from '@/components/citizen/CitizenMoreInfo'

const CitizenProfilePage: FC = () => {
  return (
    <div className='flex gap-5 w-full max-[900px]:flex-col'>
      <div className='w-[28%] max-[1500px]:w-[31%] max-[1250px]:w-[35%] max-[1130px]:w-[38%] max-[900px]:w-full'>
        <CitizenPersonalInfo />
      </div>

      <div className='flex-1 flex flex-col gap-5'>
        <CitizenMoreInfo />
        {/* <CitizenFollowingList /> */}
      </div>
    </div>
  )
}

export default CitizenProfilePage
