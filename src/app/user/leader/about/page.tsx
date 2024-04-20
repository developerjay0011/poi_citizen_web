'use client'
import { FC } from 'react'
import { LeaderPersonalInfo } from '@/components/leader/LeaderPersonalInfo'

import { GeneralInfoBox } from '@/components/leader/GeneralInfoBox'
import { CommonBox } from '@/utils/CommonBox'
import { AgendaPost } from '../feed/LeaderAgenda'
import { cusSelector } from '@/redux_store/cusHooks'

const LeaderProfilePage: FC = () => {
  const { leaderData } = cusSelector((st) => st.auth);
  return (
    <div className='flex gap-5 w-full flex-col'>
      <div className='flex gap-5 w-full max-[900px]:flex-col'>
        <div className='w-[28%] max-[1500px]:w-[31%] max-[1250px]:w-[35%] max-[1130px]:w-[38%] max-[900px]:w-full'>
          <LeaderPersonalInfo />
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <GeneralInfoBox />
        </div>
      </div>
      <div className='flex gap-5 w-full max-[900px]:flex-col'>
        {leaderData?.agendas?.length > 0 &&
          <div className='flex-1 flex flex-col gap-5'>
            <CommonBox title='Agenda'>
              <div className='py-5'>
                {leaderData?.agendas?.map((el: any, index: any) =>
                  <AgendaPost
                    {...el}
                    index={index}
                    type={el.type as any}
                    allData={el}
                    post={el.post as any}
                    userdetails={leaderData}
                  />
                )}
              </div>
            </CommonBox>
          </div>
        }
        {leaderData?.developments?.length > 0 &&
          <div className='flex-1 flex flex-col gap-5'>
            <CommonBox title='Developments'>
              <div className='py-5'>
                {leaderData?.developments?.map((el: any, index: any) =>
                  <AgendaPost
                    {...el}
                    index={index}
                    type={el.type as any}
                    allData={el}
                    userdetails={leaderData}
                    title={el.development_title}
                    post={el.post as any}
                  />
                )}
              </div>
            </CommonBox>
          </div>
        }
      </div>
    </div>
  )
}

export default LeaderProfilePage
