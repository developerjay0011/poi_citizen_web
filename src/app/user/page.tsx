"use client";
import { CitizenFeed } from "@/components/citizen/CitizenFeed";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingLeaders } from "@/components/timlineComponents/trendingLeader/TrendingLeaders";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { GetPostsForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { GetRaisedComplaints} from "@/redux_store/complaints/complaintsApi";
import { useEffect, useState } from "react";
import { complaintActions } from "@/redux_store/complaints/complaintSlice";
import { GetRaisedRequests } from "@/redux_store/requests/requestAPI";


const CitizenHomePage = () => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  useEffect(() => {

    (async () => {
      try {
    if (userDetails?.id) {
    const data = await GetPostsForCitizen(userDetails?.id);
          if (data?.length > 0) {
            dispatch(postActions.setPost(data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userDetails]);

  useEffect(() => {
    (async () => {
      try {
        if (userDetails?.id) {
          const data = await GetRaisedComplaints(userDetails?.id);

          if (data.length > 0) {
            dispatch(complaintActions.storeComplaints(data))
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userDetails]);


  useEffect(() => {
    (async () => {
      try {
        if (userDetails?.id) {
          const data = await GetRaisedRequests(userDetails?.id);
          console.log(data, "dataGetRaisedRequestsdataGetRaisedRequestsdataGetRaisedRequests");

          if (data.length > 0) {
            dispatch(complaintActions.storeComplaints(data))
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
