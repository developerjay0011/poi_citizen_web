"use client";
import { FC } from "react";
import { cusSelector } from "@/redux_store/cusHooks";
import { Post } from "@/components/posts/Post";
import { StoriesBox } from "@/components/timlineComponents/StoriesBox";
import { PollPost } from "@/components/posts/polls/PollPost";

interface TimeLinePageProps {
  leader_id: string
  stories?: any
  posts?: any
}
export const TimeLinePage: FC<TimeLinePageProps> = ({ leader_id, stories, posts }) => {
  var is_my_postandstories = false
  const { leaderData } = cusSelector((st) => st.auth);
  const Getpost = async () => { };
  var mypostdata = { image: leaderData?.image, name: leaderData?.personal_info?.last_name && leaderData?.personal_info?.first_name ? leaderData?.personal_info?.first_name + " " + leaderData?.personal_info?.last_name : leaderData?.personal_info?.first_name, leaderid: leader_id }

  return (
    <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
      <StoriesBox />
      {posts?.map((el: any, index: string) => {
        var type = el?.type
        return type === "post" ? (
          <div key={index}>
            <Post
              {...el}
              index={index}
              Getpost={Getpost}
              userdetails={mypostdata}
              post={el}
              type={el.type as any}
              is_my={false}
              allData={{ ...el, mypostdata }}
            />
          </div>
        ) : (type === "agendas" || type === "developments") && is_my_postandstories ? (
          <div key={index}>
            {/* <AgendaPost
              {...el}
              index={index}
              Getpost={Getpost}
              type={el.type as any}
              allData={el}
              userdetails={el.userdetails as any}
              post={el.post as any}
            /> */}
          </div>
        ) : type === "polls" ? (
          <div key={index}>
            <PollPost
              {...el}
              index={index}
              key={index}
              Getpost={Getpost}
              allData={el}
              userdetails={el.userdetails as any}
              post={el.post as any}
            />
          </div>
        ) : null
      })}
    </div>
  );
};
