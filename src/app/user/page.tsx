"use client";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingLeaders } from "@/components/timlineComponents/trendingLeader/TrendingLeaders";
import { cusSelector } from "@/redux_store/cusHooks";
import { BirthdayNotifications } from "@/components/timlineComponents/BirthdayNotifications";


const CitizenHomePage = () => {
  const { birthdaylist } = cusSelector((st) => st.auth);

  return (
    <section className="w-full relative">
      <div className="flex gap-5">
        {/* LEFT FEED */}
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          {birthdaylist?.length > 0 && <BirthdayNotifications />}
          <TrendingLeaders />
        </div>

        {/* <CitizenFeed /> */}
        <TimeLinePage />

        {/* RIGHT FEED */}
        <div className="flex flex-col self-start gap-5 max-[1200px]:hidden">
          <BriefProfileInfoBox />
          <ShortcutsBox />
        </div>
      </div>
    </section>
  );
};

export default CitizenHomePage;
