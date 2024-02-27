'use client'
import { useState } from 'react'
import MODI from '@/assets/politicians-images/narendar_modi.jpg'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Follower } from '@/components/peoples/Follower'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'

const CitizenProfileFollowingsPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <>
      <div className='flex gap-5 relative'>
        <div className='self-start sticky top-0 left-0'>
          <ShortcutsBox />
        </div>

        <div className='flex-grow'>
          <PeoplesComponentWrapper
            heading='followings'
            searchStr={searchString}
            setSearchStr={changeSearchString}>
            <ul className='grid grid-cols-3 gap-5'>
              <Follower displayImg={MODI} />
            </ul>
          </PeoplesComponentWrapper>
        </div>
      </div>
    </>
  )
}

export default CitizenProfileFollowingsPage
