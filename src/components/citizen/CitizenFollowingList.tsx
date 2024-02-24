import { ProtectedRoutes } from '@/constants/routes'
import { CommonBox } from '@/utils/CommonBox'
import Link from 'next/link'
import { FC } from 'react'

interface CitizenFollowingListProps {}
export const CitizenFollowingList: FC<CitizenFollowingListProps> = () => {
  return (
    <>
      <CommonBox
        title={"Following's (0)"}
        cusJSX={[
          <Link
            href={ProtectedRoutes.followers}
            key={Math.random()}
            className='text-orange-600 text-[14px] hover:underline'>
            See all
          </Link>,
        ]}>
        <div className='w-full py-5 x_cusScroll'>
          <ul className='flex gap-5 w-max'></ul>
        </div>
      </CommonBox>
    </>
  )
}
