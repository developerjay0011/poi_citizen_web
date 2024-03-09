import { FC } from 'react'
import { REQUEST_STATUS, ToDetails, RQ_VAL } from '@/utils/typesUtils'
import Image from 'next/image'
import { BiX } from 'react-icons/bi'
import { motion as m } from 'framer-motion'
import { FaThumbsDown } from 'react-icons/fa'
import { getImageUrl } from '@/config/get-image-url'

interface ToDetailsBoxProps {
  onClose: () => void
  toList: ToDetails[]
}

export const ToDetailsBox: FC<ToDetailsBoxProps> = ({ onClose, toList }) => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 bg-black backdrop-blur-[2px] bg-opacity-30 w-full h-[100dvh] z-[100]'>
        <div className='w-full h-full flex items-start justify-center'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[30%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-3xl capitalize'>
              Leaders List
            </h3>

            <ul className='flex flex-col'>
              {toList.map((el, i) => (
                <ToListRow {...el} key={i} />
              ))}
            </ul>
          </m.div>
        </div>
      </m.div>
    </>
  )
}

const ToListRow: FC<ToDetails> = ({
  designation,
  image,
  name,
  requestComplaintStatus,
  isSeen,
}) => {
  return (
    <>
      <li className='flex gap-4 items-center p-5 last_noti'>
        <Image
          priority={true}
          src={getImageUrl(image as string)}
          alt='leader img'
          width={1000}
          height={1000}
          className='w-14 aspect-square object-cover object-center rounded-full bg-rose-200 '
        />

        <div className='flex flex-col capitalize'>
          <h3 className='font-medium text-lg'>{name}</h3>
          <p className='text-sm capitalize'>{designation}</p>
        </div>

        <button
          type='button'
          className={`px-2 rounded border capitalize text-sm ml-auto font-medium ${REQUEST_STATUS[requestComplaintStatus as RQ_VAL].classes
            }`}>
          {REQUEST_STATUS[requestComplaintStatus as RQ_VAL].name}
        </button>

        {isSeen !== '0' && (
          <button
            type='button'
            className='hover:text-orange-500 hover:scale-125 transition-all active:scale-110'>
            <FaThumbsDown className='text-xl' />
          </button>
        )}
      </li>
    </>
  )
}
