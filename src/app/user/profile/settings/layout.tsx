'use client'
import { CusLink } from '@/utils/CusLink'
import { FC, ReactNode } from 'react'
import { FaEdit } from 'react-icons/fa'

const CitzenSettingsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <section className='flex bg-white border rounded-md shadow-sm p-10 max-[920px]:flex-col max-[470px]:p-5'>
        {/* Nav */}
        <nav className='flex flex-col gap-5 max-[920px]:flex-row'>
          <CusLink
            normalClasses='text-sky-950'
            href={`/user/profile/settings/edit-profile`}
            className='flex items-center gap-2 transition-all hover:text-orange-600'
            activeLinkClasses='text-orange-600'>
            <FaEdit /> <span className='capitalize'>edit profile</span>
          </CusLink>
        </nav>

        {/* Horizontal Line */}
        <div className='w-[1px] bg-zinc-300 rounded-md mx-10 max-[920px]:w-full max-[920px]:h-[1px] max-[920px]:mx-0 max-[920px]:my-5' />

        {/* Content acc to link */}
        <div className='flex-1'>{children}</div>
      </section>
    </>
  )
}

export default CitzenSettingsLayout
