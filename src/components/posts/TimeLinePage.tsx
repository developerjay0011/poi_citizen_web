"use client";
import { FC, useEffect } from "react";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice"
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { RootState } from "@/redux_store";
import { GetPostsForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { AgendaPost } from "./AgendaPost";
import { PollPost } from "./polls/PollPost";
import { AgendaPost } from "./AgendaPost";
import { RootState } from "@/redux_store";
import { fetchGetPostsForCitizen } from "../api/posts";

interface TimeLinePageProps {}

interface UserDetails {
  token: string;
  id: string;
}

export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const [postData, setPostData] = useState([]);
  const [upPost, setUpPost] = useState();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
  });

  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

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
      await Getpost();
    })();
  }, [userDetails]);

  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox />
        <NewPostBox updatePost={updatePost} />

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

        {postData.map((el: any) => {
          console.log(el);

          const imageDta = el?.image;

          return (
            <Post
              {...el}
              key={el.id}
              media={el.posts?.flatMap((file: any) =>
                file.media?.map(
                  (item: any) =>
                    `http://203.92.43.166:4005${item.media}` as string
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
              userdetails={el.userdetails as any}
              post={el.post as any}
            />
          </div>
        ) : null
      })}
    </div>
  );
};
