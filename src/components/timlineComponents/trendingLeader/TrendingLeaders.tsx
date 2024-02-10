import { FC, useEffect, useState } from "react";
import { TrendingLeader } from "./TrendingLeader";

import {
  fetchCitizenFollowingList,
  fetchTrendingLeaderList,
} from "@/components/api/followCitixen";

interface UserDetails {
  token: string;
  id: string;
  // Add any other properties you expect in UserDetails
}

export const TrendingLeaders: FC = () => {
  const [followers, setFollowers] = useState([]);
  const [trendingLeaders, setTrendingLeaders] = useState([]);
  const [handleFollowers, setHandleFollowers] = useState({});
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
  });

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserDetails(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const token = userDetails?.token;
      const citizenid = userDetails?.id;

      if (citizenid?.length > 0) {
        const data = await fetchCitizenFollowingList(citizenid, token);

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

        if (data.length > 0) {
          setTrendingLeaders(data);
          setHandleFollowers(data);
        }
      })();
    }
  }, [userDetails]);

  const following = (data: any) => {
    setHandleFollowers(data);
  };

  return (
    <>
      <section
        className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}
      >
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize">
          Trending Citizen
        </h2>

        {/* <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {LEADERS.map((el) => (
              <TrendingLeader key={el.id} {...el} />
            ))}
          </ul>
        </div> */}
        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {trendingLeaders?.length > 0 &&
              trendingLeaders.map((el: any, index) => {

                return (
                  <TrendingLeader key={index} {...el} following={following} />
                );
              })}
          </ul>
        </div>
      </section>

      <section
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
      </section>
    </>
  );
};
