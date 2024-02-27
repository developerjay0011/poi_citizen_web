import { Like, MediaPost } from '@/utils/typesUtils'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'
import { FullPost } from './FullPost'

export const FourColumnImgLayout: FC<{
  onClick: () => void
  media: MediaPost[]
  showFullPost: boolean
  hidePost: () => void
  userId: string
}> = ({ onClick, media, hidePost, showFullPost, userId }) => {
  return (
    <>
      <figure
        className='w-full relative grid grid-cols-2 gap-1'
        onClick={onClick}>
        {media.map((el) => {
          if (el.type === 'image')
            return (
              <Image
                priority={true}
                key={el.id}
                src={el.media}
                width={1000}
                height={1000}
                alt='user post'
                className='object-cover object-center w-full h-full'
              />
            )

          if (el.type === 'video')
            return (
              <video
                key={el.id}
                src={el.media}
                className='object-cover object-center w-full h-full'
                controls
              />
            )
        })}
      </figure>

      <AnimatePresence>
        {showFullPost && (
          <FullPost
            onClose={hidePost}
            posts={media}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </>
  )
}
