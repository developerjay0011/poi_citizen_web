import { FC, useEffect, useRef, useState } from "react";
import { TrendingLeader } from "./TrendingLeader";
import { fetchTrendingLeaderList } from "@/redux_store/auth/authAPI";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { fetchCitizenFollowingList } from "@/redux_store/follow/followAPI";
import { followActions } from "@/redux_store/follow/followSlice";
import { authActions } from "@/redux_store/auth/authSlice";

export const TrendingLeaders: FC = () => {
  const { userDetails, trendingleader } = cusSelector((st) => st.auth);
  const { following } = cusSelector((st) => st.follow);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(10);
  const [loadIncrement, setLoadIncrement] = useState(10);
  const dispatch = cusDispatch();

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // First load was 10 items, subsequent loads will be 20
      setLoadIncrement(20);
      setVisibleItems(prev => prev + loadIncrement);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [loadIncrement]);

  const visibleLeaders = trendingleader?.slice(0, visibleItems);



  const Gelfollowinglist = async () => {
    if (userDetails?.id) {
      const data = await fetchCitizenFollowingList(userDetails?.id);
      dispatch(followActions.Following(data));
      const trending = await fetchTrendingLeaderList();
      dispatch(authActions.Settrendingleader(trending));
    }
  };

  const isFollow = (id: string) => {
    if (Array.isArray(following)) {
      var follows = following?.find((item) => item?.leaderid == id);
      return follows?.leaderid ? true : false;
    } else false;
  };

  return (
    <>
      <section
        className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}
      >
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize">
          Trending Leader
        </h2>
        <div ref={containerRef} className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {visibleLeaders?.length > 0 &&
              visibleLeaders.map((el: any, index: any) => {
                return (
                  <TrendingLeader
                    key={index}
                    {...el}
                    following={() => Gelfollowinglist()}
                    isfollowing={isFollow(el?.id)}
                  />
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
};
