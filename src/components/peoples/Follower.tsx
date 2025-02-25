import { getImageUrl } from '@/config/get-image-url'
import CustomImage from '@/utils/CustomImage'
import { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface FollowerProps {
  displayImg?: string | StaticImageData
  data: any,
  item?: any
  handleUnfollow: (id: string) => void
  name?: any
  other?: boolean
}

export const Follower: FC<FollowerProps> = ({ displayImg, data, handleUnfollow, other }) => {
  return (
    <div className='border rounded-md bg-white p-4 flex gap-2 items-center relative'>
      <CustomImage
        src={getImageUrl(data?.image)}
        alt='user display pic'
        width={1000}
        height={1000}
        className='rounded-full w-20 aspect-square object-cover object-center bg-rose-100'
      />

      <div className='flex flex-col flex-grow'>
        <Link href={`/user/leader/about?id=${data?.leaderid}`} >
          <h3 className='flex flex-col font-semibold text-lg capitalize'>{data?.name}</h3>

          {data?.leaderid && <span className='text-[14px] font-normal'>{data?.designation}</span>}
        </Link>
        {(data?.leaderid && other == false) &&
          <p className='text-[14px] flex justify-between'>
            {data?.followers} followers
            <button
              type='button'
              onClick={() => { handleUnfollow(data?.leaderid) }}
              className='border border-orange-500 text-orange-500 font-medium text-sm bg-orange-50 px-2 py-[2px] rounded hover:bg-orange-500 hover:text-orange-50 transition-all'>
              Unfollow
            </button>
          </p>
        }
      </div>
    </div >
  )
}
