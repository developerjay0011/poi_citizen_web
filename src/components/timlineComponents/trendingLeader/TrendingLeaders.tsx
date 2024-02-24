import { FC, useEffect, useState } from "react";
import { TrendingLeader } from "./TrendingLeader";
import { fetchTrendingLeaderList } from "@/redux_store/auth/authAPI";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { fetchCitizenFollowingList } from "@/redux_store/follow/followAPI";
import { followActions } from "@/redux_store/follow/followSlice";
export const TrendingLeaders: FC = () => {
  const [trendingLeaders, setTrendingLeaders] = useState([]);
  const [handleFollowers, setHandleFollowers] = useState({});
  const { userDetails } = cusSelector((st) => st.auth);
  const { following } = cusSelector((st) => st.follow);
  const dispatch = cusDispatch();
  const Gelfollowinglist = async () => {
    if (userDetails?.id) {
      const data = await fetchCitizenFollowingList(userDetails?.id);
      if (data?.length > 0) {
        dispatch(followActions.Following(data));
      }
    }
  };
  useEffect(() => {
    Gelfollowinglist();
  }, [userDetails, handleFollowers]);

  useEffect(() => {
    if (userDetails) {
      (async () => {
        const data = await fetchTrendingLeaderList();
        if (data.length > 0) {
          setTrendingLeaders(data);
        }
      })();
    }
  }, [userDetails]);

  const Onfollowing = (data: any) => {
    Gelfollowinglist();
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
          Trending Citizen
        </h2>
        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {trendingLeaders?.length > 0 &&
              trendingLeaders.map((el: any, index) => {
                return (
                  <TrendingLeader
                    key={index}
                    {...el}
                    following={Onfollowing}
                    isfollowing={isFollow(el?.id)}
                  />
                );
              })}
          </ul>
        </div>
      </section>

      {/* <section
        className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}
      >
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize">
          Following Citizen
        </h2>

        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {followers?.length > 0 &&
              followers.map((el: any, index) => {
                return (
                  <TrendingLeader
                    key={index}
                    {...el}
                    following={following}
                    unfollow={true}
                  />
                );
              })}
          </ul>
        </div>
      </section> */}
    </>
  );
};
