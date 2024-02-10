import { FC } from 'react'

interface CitizenFeedProps {}
export const CitizenFeed: FC<CitizenFeedProps> = () => {
  return (
    <>
      <div className='flex-1 flex flex-col gap-5 max-[1200px]:w-full'>
        <h2 className='text-center capitalize text-3xl'>No posts found❗❗</h2>

      </div>
      
    </>
  )
}
