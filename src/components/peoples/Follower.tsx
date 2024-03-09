import { getImageUrl } from '@/config/get-image-url'
import CustomImage from '@/utils/CustomImage'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsThreeDots } from 'react-icons/bs'

interface FollowerProps {
  displayImg: string | StaticImageData
  data: any,
  handleUnfollow: (id: string) => void
}

export const Follower: FC<FollowerProps> = ({ displayImg, data, handleUnfollow }) => {
  return (
    <Link href={`/user/leader/about?id=${data?.leaderid}`} className='border rounded-md bg-white p-4 flex gap-2 items-center relative'>
      <CustomImage
        priority={true}
        src={getImageUrl(data?.image)}
        alt='user display pic'
        width={1000}
        height={1000}
        className='rounded-full w-20 aspect-square object-cover object-center bg-rose-100'
      />
      <div className='flex flex-col flex-grow'>
        <h3 className='flex flex-col font-semibold text-lg capitalize'>{data?.name}</h3>
        {data?.leaderid && <span className='text-[14px] font-normal'>{data?.designation}</span>}
        {data?.leaderid &&
          <p className='text-[14px] flex justify-between'>
            {data?.followers} followers
            <button
              type='button'
              onClick={() => { handleUnfollow(data?.leaderid) }}
              className='border border-orange-500 text-orange-500 font-medium text-sm bg-orange-50 px-2 py-[2px] rounded hover:bg-orange-500 hover:text-orange-50 transition-all'>
              un Follow
            </button>
          </p>
        }
      </div>
    </Link >
  )
}
