"use client";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingLeaders } from "@/components/timlineComponents/trendingLeader/TrendingLeaders";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { GetRaisedComplaints } from "@/redux_store/complaints/complaintsApi";
import { useEffect } from "react";
import { complaintActions } from "@/redux_store/complaints/complaintSlice";
import { GetRaisedRequests } from "@/redux_store/requests/requestAPI";
import { GetSuggestions } from "@/redux_store/suggestions/suggestionAPI";
import { suggestionActions } from "@/redux_store/suggestions/suggestionSlice";
import { requestActions } from "@/redux_store/requests/requestSlice";
import { tryCatch } from "@/config/try-catch";
import { BirthdayNotifications } from "@/components/timlineComponents/BirthdayNotifications";

const CitizenHomePage = () => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  useEffect(() => {
    (async () => {
      tryCatch(
        async () => {
        if (userDetails?.id) {
          const data = await GetRaisedComplaints(userDetails?.id);
          dispatch(complaintActions.storeComplaints(data));
          const dataRequest = await GetRaisedRequests(userDetails?.id);
          dispatch(requestActions.storeRequest(dataRequest));
          const dataSuggestions = await GetSuggestions(userDetails?.id);
          dispatch(suggestionActions.storeSuggestions(data));
        }
      })
    })();
  }, [userDetails]);

  return (
    <section className="w-full relative">
      <div className="flex gap-5">
        {/* LEFT FEED */}
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          <BirthdayNotifications/>
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
