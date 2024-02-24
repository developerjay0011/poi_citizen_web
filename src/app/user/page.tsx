"use client";
import { CitizenFeed } from "@/components/citizen/CitizenFeed";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingLeaders } from "@/components/timlineComponents/trendingLeader/TrendingLeaders";
import { cusDispatch } from "@/redux_store/cusHooks";
import { GetPostsForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { useEffect, useState } from "react";

interface UserDetails {
  token: string;
  id: string;
}

const CitizenHomePage = () => {
  const dispatch = cusDispatch();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
  });

  // get user details from session

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
    const citizenid = userDetails?.id;

    (async () => {
      try {
        if (citizenid?.length > 0) {
          const data = await GetPostsForCitizen(citizenid);

          if (data?.length > 0) {
            console.log(data);
            dispatch(postActions.setPost(data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userDetails]);

  return (
    <section className="w-full relative">
      <div className="flex gap-5">
        {/* LEFT FEED */}
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          <TrendingLeaders />
          <ShortcutsBox />
        </div>

        {/* <CitizenFeed /> */}
        <TimeLinePage />

        {/* RIGHT FEED */}
        <div className="flex flex-col self-start gap-5 max-[1200px]:hidden">
          <BriefProfileInfoBox />
        </div>
      </div>
    </section>
  );
};

export default CitizenHomePage;
