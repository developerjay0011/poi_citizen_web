import { FC, useEffect, useState } from "react";
import { TrendingLeader } from "./TrendingLeader";
import { fetchTrendingLeaderList } from "@/redux_store/auth/authAPI";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { fetchCitizenFollowingList } from "@/redux_store/follow/followAPI";
import { followActions } from "@/redux_store/follow/followSlice";
import { authActions } from "@/redux_store/auth/authSlice";
export const TrendingLeaders: FC = () => {
  const { userDetails, trendingleader } = cusSelector((st) => st.auth);
  const { following } = cusSelector((st) => st.follow);
  const dispatch = cusDispatch();
  const Gelfollowinglist = async () => {
    if (userDetails?.id) {
      const data = await fetchCitizenFollowingList(userDetails?.id);
      const trending = await fetchTrendingLeaderList();
      dispatch(followActions.Following(data));
      dispatch(authActions.Settrendingleader(trending));
    }
  };
  useEffect(() => {
    (async () => {
      const token = userDetails?.token;
      const citizenid = userDetails?.id;

      if (citizenid?.length > 0) {
        const data = await fetchCitizenFollowingList(citizenid, token);
        console.log(data);

        if (data.length > 0) {
          setFollowers(data);
        }
      }
    })();
  }, [userDetails, handleFollowers]);

  useEffect(() => {
    if (userDetails) {
      (async () => {
        const token = userDetails?.token;
        const data = await fetchTrendingLeaderList(token);

        console.log(data);

        if (data.length > 0) {
          setTrendingLeaders(data);
          setHandleFollowers(data);
        }
      })();
    }
  }, [userDetails]);

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
                    following={async () => await Gelfollowinglist()}
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
