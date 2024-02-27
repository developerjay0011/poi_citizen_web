"use client";
import { FC, useEffect, useState } from "react";
import { NewPostBox } from "./NewPostBox";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { PollPost } from "./polls/PollPost";
import { AgendaPost } from "./AgendaPost";
import { RootState } from "@/redux_store";
import { fetchGetPostsForCitizen } from "../api/posts";
import { GetPostsForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { getImageUrl } from "@/config/get-image-url";
interface TimeLinePageProps { }

export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const [upPost, setUpPost] = useState();
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
      try {
        Getpost();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userDetails]);
  const updatePost = (data: any) => {
    setUpPost(data);
  };
  const ConvertCommonpost = (list = []): any => {
    var combinedData = [] as any;
    list?.forEach((userData: any) => {
      userData.posts.forEach((post: any) => {
        combinedData.push({
          post,
          type: "post",
          userdetails: { post: [], ...userData },
        });
      });
      userData.agendas.forEach((post: any) => {
        combinedData.push({
          post,
          type: "agendas",
          createddate: post?.created_date,
          userdetails: { post: [], ...userData },
        });
      });
      userData.polls.forEach((post: any) => {
        combinedData.push({
          post,
          type: "polls",
          createddate: post?.publish_date,
          userdetails: { post: [], ...userData },
        });
      });
      userData.developments.forEach((post: any) => {
        combinedData.push({
          post,
          type: "developments",
          createddate: post?.created_date,
          userdetails: { post: [], ...userData },
        });
      });
    });
    combinedData.sort((a: any, b: any) => {
      const dateA = new Date(a.post.createddate);
      const dateB = new Date(b.post.createddate);
      return dateB.getTime() - dateA.getTime();
    });
    return Array.isArray(combinedData) && combinedData;
  };
  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox />
        {/* <NewPostBox updatePost={updatePost} /> */}

        {/* <Post
          createdDatetime="2023-11-05"
          type="post"
          userId=""
          writtenText="Hello there"
          id="13213"
          leaderid=""
          updatePost=""
          types={[]}
          media={[
            {
              comments: [
                {
                  comments: [],
                  commentText: "nice Post",
                  createdDate: "2023-11-06",
                  id: "132",
                  likes: [{ userId: "123213" }],
                  userId: "123c",
                  userImg: "",
                  username: "fde",
                },
              ],
              id: "dafd",
              likes: [{ userId: "dsadf" }],
              media: "",
              type: "video",
            },
          ]}
          comments={[
            {
              comments: [],
              commentText: "nice Post",
              createdDate: "2023-11-06",
              id: "132",
              likes: [{ userId: "123213" }],
              userId: "123c",
              userImg: "",
              username: "fde",
            },
          ]}
          likes={[{ userId: "dsadf" }]}
        /> */}

        {/* <Post
          createdDatetime="2023-11-05"
          type="post"
          userId=""
          writtenText="Hello there"
          id="13213"
          media={[]}
          leaderid=""
          updatePost=""
          types={[]}
          comments={[
            {
              comments: [
                {
                  commentText: "nice Post",
                  createdDate: "2023-11-06",
                  id: "132",
                  likes: [{ userId: "123213" }],
                  userId: "123c",
                  userImg: "",
                  username: "fde",
                },
              ],
              commentText: "nice Post",
              createdDate: "2023-11-06",
              id: "132",
              likes: [{ userId: "123213" }],
              userId: "123c",
              userImg: "",
              username: "fde",
            },
          ]}
          likes={[{ userId: "dsadf" }]}
        /> */}

        {/*  <PollPost
          access=""
          createdDate="2023-11-05"
          expiresAt="2045-11-11"
          id="dasd"
          imgOptions={[]}
          options={[
            { id: "fdsf", option: "dsfeww", votes: 1 },
            { id: "dsf", option: "dsfds", votes: 0 },
          ]}
          pollType="text"
          postId="dsfsd"
          publishDate="2024-12-15"
          title="dsaf"
          userId="dsaf"
          username="R.K Singh"
        /> */}

        {/*    <AgendaPost
          access=""
          attachments=""
          category=""
          createDate="2023-12-05"
          description=""
          documents=""
          id=""
          priority="high"
          status="0"
          title=""
          userId=""
        /> */}

        {/* {posts.map((el) => {
          if (el.type === "post")
            return (
              <Post
                {...el}
                key={el.id}
                media={JSON.parse(el.media as string)}
                comments={JSON.parse(el.comments as string)}
                likes={JSON.parse(el.likes as string)}
              />
            );
        })} */}

        {ConvertCommonpost(postData).map((el: any, index: string) => {
          const imageDta = el?.image;
          return (
            <Post
              {...el}
              key={index}
              Getpost={Getpost}
              userdetails={el.userdetails as any}
              post={el.post as any}
              type={el.type as any}
              media={el.posts?.flatMap((file: any) =>
                file.media?.map(
                  (item: any) => getImageUrl(item.media) as string
                )
              )}
              likes={el.posts?.flatMap((file: any) => file?.likes) as string}
              createdDatetime={el.createddate as string}
              writtenText={el.written_text as string}
              updatePost={updatePost}
              types={el.posts?.flatMap((file: any) =>
                file.media?.map((item: any) => item.type as string)
              )}
              name={el.name}
              userimages={imageDta?.length > 0 && imageDta}
              allData={el}
              comments={
                el.posts?.flatMap((file: any) =>
                  file?.media?.flatMap((item: any) => item?.comments)
                ) as string
              }
              id={el.posts?.map((postid: any) => postid?.id) as string}
            />
          );
        })}
      </div>
    </>
  );
};
