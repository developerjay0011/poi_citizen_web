'use client'
import { CitizenProfileNavbar } from '@/components/citizen/CitizenProfileNavbar'
import { cusSelector } from '@/redux_store/cusHooks'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, FC } from 'react'

const CitizenProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { userDetails } = cusSelector((st) => st.auth)

  return (
    <div className='flex flex-col gap-5'>
      <section className='flex flex-col text-sky-950 border-b border-l border-r w-full'>
        {/* USER PIC and BG pic*/}
        <figure className='relative rounded-tr-lg rounded-tl-lg overflow-hidden'>
          <Image
            src={userDetails?.backgroundPic as string}
            alt='bg image'
            width={1000}
            height={1000}
            className='w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]'
          />

          <Image
            src={userDetails?.displayPic as string}
            alt='display image'
            width={1000}
            height={1000}
            className='w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]'
          />
        </figure>

        <div className='bg-white py-5 px-14 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col'>
          <Link href={'/user/profile'}>
            <h5 className='flex flex-col items-center text-xl font-[600] capitalize'>
              {userDetails?.firstname} {userDetails?.lastname}
            </h5>
          </Link>

          {/* User Nav */}
          <CitizenProfileNavbar />
        </div>
      </section>

      {/* Data will get rendered acc. to route clicked */}
      <section className='w-full'>{children}</section>
    </div>
  )
}

export default CitizenProfileLayout
