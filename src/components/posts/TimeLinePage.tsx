"use client";
import { FC, useEffect } from "react";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { RootState } from "@/redux_store";
import { GetPostsForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { AgendaPost } from "./AgendaPost";
import { PollPost } from "./polls/PollPost";
import { useRouter } from "next/navigation";
interface TimeLinePageProps { }

export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const postData: any = cusSelector((state: RootState) => state.post.allPosts);
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  const Getpost = async () => {
    if (userDetails?.id) {
      const data = await GetPostsForCitizen(userDetails?.id);
      if (data?.length > 0) {
        dispatch(postActions.setPost(data));
      }
    }
  };
  useEffect(() => {
    (async () => {
      await Getpost();
    })();
  }, [userDetails]);

  return (
    <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
      <StoriesBox />
      {postData.map((el: any, index: string) => {
        var type = el?.type
        return type === "post" ? (
          <div key={index}>
            <Post
              {...el}
              index={index}
              Getpost={Getpost}
              userdetails={el.userdetails as any}
              post={el.post as any}
              type={el.type as any}
              allData={el}
            />
          </div>
        ) : type === "agendas" || type === "developments" ? (
          <div key={index}>
            <AgendaPost
              {...el}
              index={index}
              Getpost={Getpost}
              type={el.type as any}
              allData={el}
              userdetails={el.userdetails as any}
              post={el.post as any}
            />
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
      {postData?.length == 0 &&
        <h3 className="col-span-full text-center py-10 capitalize text-3xl">
          No posts Found!!
        </h3>
      }
    </div>
  );
};
