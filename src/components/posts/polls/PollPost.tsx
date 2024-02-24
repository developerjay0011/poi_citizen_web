'use client'
import { dateConverter } from '@/utils/utility'
import Image from 'next/image'
import { FC, useState } from 'react'
import { PollDetails } from '@/utils/typesUtils'
import { cusSelector } from '@/redux_store/cusHooks'
import { AnimatePresence } from 'framer-motion'
import { PollOption } from './PollOption'
import { RootState } from '@/redux_store'
import { getImageUrl } from '@/config/get-image-url'

interface PollPostProps extends PollDetails {
  username: string
  userId: string
  postId: string
  createdDate: string
}

export const PollPost: FC<PollPostProps> = ({
  imgOptions,
  options,
  pollType,
  title,
  postId,
  userId,
  username,
  createdDate,
}) => {
  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  // const [userDetails] = useState("");
  // const { userDetails } = cusSelector((st) => st.UI)

  // Calculating votes count
  const votes =
    pollType === 'image'
      ? imgOptions.reduce((prev, el) => el.votes + prev, 0)
      : options.reduce((prev, el) => el.votes + prev, 0)

  return (
    <>
      <section className='border shadow-sm rounded-md px-5 py-2 bg-white'>
        <div className='flex items-center gap-3 py-4 text-sky-950 border-b'>
          <Image
            src={getImageUrl(userDetails?.image)}
            alt='user pic'
            className='w-12 aspect-square object-cover object-center rounded-full'
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className='font-[600] text-lg text-orange-500'>{username}</h4>
            <p className='flex items-center capitalize gap-2 text-sm font-[500]'>
              <span>created a poll at {dateConverter(createdDate)}</span>
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-5 my-5'>
          {/* TEXT POST */}
          <p className='text-[16px]'>{title}</p>

          <p className='font-medium text-zinc-600'>{votes} votes</p>

          {/* MEDIA */}
          <section className='w-full flex flex-col gap-3'>
            {pollType === 'image' &&
              imgOptions.map((el, i) => (
                <PollOption
                  id={el.id}
                  index={i + 1}
                  pollText={el.text}
                  key={el.id}
                  pollImg={el.media}
                />
              ))}

            {pollType === 'text' &&
              options.map((el, i) => (
                <PollOption
                  id={el.id}
                  index={i + 1}
                  pollText={el.option}
                  key={el.id}
                />
              ))}
          </section>
        </div>
      </section>
    </>
  )
}
