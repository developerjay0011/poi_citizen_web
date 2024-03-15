'use client'
import { useEffect, useState } from 'react'
import MODI from '@/assets/politicians-images/narendar_modi.jpg'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Follower } from '@/components/peoples/Follower'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { fetchCitizenFollowingList, fetchUnFollowLeader } from '@/redux_store/follow/followAPI'
import { followActions } from '@/redux_store/follow/followSlice'
import toast from 'react-hot-toast'

const CitizenProfileFollowingsPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  const { following } = cusSelector((st) => st.follow);
  const { userDetails } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();
  const getFollowingList = async () => {
    const data = await fetchCitizenFollowingList(userDetails?.id);
    dispatch(followActions.Following(data));
  }
  useEffect(() => {
    getFollowingList()
  }, [dispatch, userDetails])
  const handleUnFollower = async (id: string) => {
    const postBody = {
      senderid: userDetails?.id,
      receiverid: id,
    };
    const response = await fetchUnFollowLeader(postBody);
    if (response?.success) {
      toast.success(response?.message);
      getFollowingList();
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <>
      <div className='flex-grow'>
        <PeoplesComponentWrapper
          heading={`followings(${following.length})`}
          searchStr={searchString}
          setSearchStr={changeSearchString}>
          <ul className='grid grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
            {following?.length > 0 &&
              following.map((el: any, index: number) => {
                return (
                  <Follower key={index} handleUnfollow={handleUnFollower} data={el} displayImg={MODI} />
                );
              })}
          </ul>
        </PeoplesComponentWrapper>
      </div>
    </>
  )
}

export default CitizenProfileFollowingsPage
