import { CommonBox } from '@/utils/CommonBox'
import { FC } from 'react'

interface BriefEventsBoxProps {}
export const BriefEventsBox: FC<BriefEventsBoxProps> = () => {
  return (
    <>
      <CommonBox title='Events'>
        <ul className='flex flex-col gap-2 my-3 max-h-[200px] overflow-y-scroll scroll_hidden'>
          <li>Event 1</li>
          <li>Event 1</li>
        </ul>
      </CommonBox>
    </>
  )
}
