'use client'
import { CusLink } from '@/utils/CusLink'
import { FC } from 'react'

interface CitizenProfileNavbarProps {}
export const CitizenProfileNavbar: FC<CitizenProfileNavbarProps> = () => {
  return (
    <>
      <nav className='flex items-center gap-8 ml-20 max-[1480px]:ml-10 max-[1200px]:ml-5 max-[450px]:gap-4 max-[1100px]:flex-wrap max-[620px]:justify-center'>
        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full max-[1238px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/feed'}>
          Feed
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[1238px]:after:top-[159%] max-[1050px]:after:top-[110%] max-[995px]:after:top-[159%] max-[995px]:after:top-[110%] max-[500px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile'}>
          About
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/complaints'}>
          complaints
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/requests'}>
          requests
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/suggestions'}>
          suggestions
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/contributions'}>
          contributions
        </CusLink>

        <CusLink
          activeLinkClasses='after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full'
          normalClasses='text-sky-950'
          className='text-lg font-[500] capitalize relative'
          href={'/user/profile/following'}>
          following
        </CusLink>
      </nav>
    </>
  )
}
