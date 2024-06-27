import { getImageUrl } from '@/config/get-image-url';
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import CustomImage from '@/utils/CustomImage'
import Link from 'next/link';
import { FC } from 'react'
import { Nave } from '../posts/utils';

interface FollowerProps {
  displayImg: string;
  name: string;
  count?: number;
  item?: any
  other?: boolean
}

export const Following: FC<FollowerProps> = ({ displayImg, name, count = 0, item, other = false }) => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);


  return (
    <li className='border rounded-md bg-white p-4 flex gap-2 items-center relative'>
      {/* <button className='absolute top-2 right-3 text-xl'>
        <BsThreeDots />
      </button> */}
      <CustomImage
        src={getImageUrl(displayImg)}
        alt='user display pic'
        width={1000}
        height={1000}
        className='rounded-full w-20 aspect-square object-cover object-center bg-rose-100'
      />

      <Link href={Nave({ id: item?.leaderid, leader: userDetails?.leaderId })} className='flex flex-col flex-grow'>
        <div className='flex flex-col flex-grow'>
          <h3 className='flex flex-col font-semibold text-lg capitalize'>
            {name}
            {item?.leaderid &&
              <span className='text-[14px] font-normal'>{item?.designation}</span>
            }
          </h3>

          {item?.leaderid &&
            <p className='text-[14px] flex justify-between'>
              {item?.followers} followers
            </p>
          }
        </div>
      </Link>
    </li >
  )
}
