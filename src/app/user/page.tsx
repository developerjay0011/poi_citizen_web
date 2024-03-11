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
import { useRouter } from "next/router";

const CitizenHomePage = () => {
  const dispatch = cusDispatch();
  const { userDetails, birthdaylist } = cusSelector((st) => st.auth);
  useEffect(() => {
    (async () => {
      tryCatch(
        async () => {
          if (userDetails?.id) {
            const data = await GetRaisedComplaints(userDetails?.id);
            if (data.length > 0) { dispatch(complaintActions.storeComplaints(data)); }
            const RaisedRequests = await GetRaisedRequests(userDetails?.id);
            if (RaisedRequests.length > 0) { dispatch(requestActions.storeRequest(RaisedRequests)); }
            const Suggestions = await GetSuggestions(userDetails?.id);
            if (Suggestions.length > 0) { dispatch(suggestionActions.storeSuggestions(Suggestions)); }
          }
        })
    })();
  }, [userDetails]);

  return (
    <section className="w-full relative">
      <div className="flex gap-5">
        {/* LEFT FEED */}
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          {birthdaylist?.length > 0 && <BirthdayNotifications />}
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
