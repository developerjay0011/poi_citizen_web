"use client";

import { Comment, Like, MediaPost, PostDetails } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BiGlobe, BiShareAlt, BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillHeartFill, BsThreeDots } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { PostOptions } from "./PostOptions";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
/* import {
  addNewComment,
  addNewNestedComment,
  deletePost,
  changeNestedLike,
  updateLike,
} from "@/redux_store/posts/postAPI"; */
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { SingleComment } from "./SingleComment";
import { MoreThan4ColumnImgLayout } from "./MoreThan4ColumnLayout";
import { FourColumnImgLayout } from "./FourColumnLayout";
import {
  fetchDeletePost,
  fetchLikePost,
  fetchUnlikePostorStory,
} from "../api/posts";
import { RootState } from "@/redux_store";

interface PostProps extends PostDetails {}

interface UserDetails {
  token: string;
  id: string;
}

export const Post: FC<PostProps> = ({
  writtenText,
  media,
  id,
  comments,
  likes,
  userId,
  createdDatetime,
  leaderid,
  types,
  name,
  userimages,
  allData,
  updatePost
}) => {
  

  const [firstTime, setFirstTime] = useState(true);
  const [showPostDetials, setShowPostDetials] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
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

  const showFullPost = () => setShowPostDetials(true);
  const hideFullPost = () => setShowPostDetials(false);

  // const deletePostHandler = () => dispatch(deletePost(id))

  const likeChangeHandler = () => {};

  const [showLikeAnimation, setShowLikeAnimation] = useState(
    (likes as Like[])?.some((el) => el.userId === userDetails?.id)
  );

  const [likeCount, setLikeCount] = useState(likes?.length); // in order to show updated like count on frontend

  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

  const deletePostHandler = async (leaderid: string, id: string) => {
    const postBody = {
      id: id,
      leaderid: leaderid,
    };
    const token = userDetails?.token;

    try {
      const data = await fetchDeletePost(postBody, token);

      if (data?.success) {
        updatePost(data);
        setShowMorePostOptions(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setFirstTime(true);
    };
  }, []);

  useEffect(() => {
    updatePost(updateComment);
    setShowComments(false);
  }, [updateComment]);


  // to show count at frontend and calling api behind
  useEffect(() => {
    if (showLikeAnimation && !firstTime) setLikeCount((lst) => lst + 1);

    if (!showLikeAnimation && !firstTime)
      setLikeCount((lst) => {
        if (lst === 0) return 0;

        return lst - 1;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLikeAnimation]);



  const handleLike = async (allData: any) => {
  
    const mediaId = allData.posts
      .map((post: any) => post.media.map((m: any) => m.id))
      .flat();

    const postid = allData.posts.map((item: any) => item?.id);


    const likeBody = {
      postid: postid[0],
      post_leaderid: allData?.leaderid,
      userid: userDetails?.id,
      mediaid: mediaId[0],
      usertype: "citizen",
    };

    const UnlikeBody = {
      postid: postid[0],
      post_leaderid: allData?.leaderid,
      userid: userDetails?.id,
    };

    const token = userDetails?.token;

    try {
      if (!showLikeAnimation) {
        const data = await fetchLikePost(likeBody, token);
        if (data?.success) {
          console.log(data);
        }
      } else {
        const data = await fetchUnlikePostorStory(UnlikeBody, token);
        if (data?.success) {
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCommentLikeHandler = (commentId: string) => {};

  const commentReplyHandler = (commentId: string, commentReply: string) => {};

  const addNewPostComment = (comment: string) => {};

  return (
    <>
      <section className="border rounded-md bg-white px-5">
        {/* User details and Date */}
        <div className="flex items-center gap-3 py-4 text-sky-950 border-b">
          <Image
            src={userimages?.length > 0 ? userimages : ""}
            alt="user pic"
            className="w-12 aspect-square object-cover object-center rounded-full"
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className="font-[600] text-lg text-orange-500">
              {name?.length > 0 ? name : "R.K Singh"}
            </h4>
            <p className="flex items-center capitalize gap-2 text-sm font-[500]">
              <BiGlobe />
              <span>
                Published on:{" "}
                {createdDatetime?.length > 0
                  ? dateConverter(createdDatetime)
                  : ""}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="ml-auto relative" id="moreOptions">
            <button onClick={() => setShowMorePostOptions((lst) => !lst)}>
              <BsThreeDots className="text-2xl" />
            </button>

            {showMorePostOptions && (
              <PostOptions
                deletePostHandler={() => deletePostHandler(leaderid, id[0])}
                userId={userId}
                onClose={() => setShowMorePostOptions(false)}
              />
            )}
          </div>
        </div>

        {/* USER POST */}
        <div className="flex flex-col gap-5 mt-5">
          {/* TEXT POST */}
          <p className="text-[16px]">{writtenText}</p>

          {/* MEDIA */}
          {media?.length > 0 && (
            <section className="w-full">
              {media.length === 1 && (
                <figure className="w-full relative" onClick={showFullPost}>
                  {(media as MediaPost[]).map((el: any, index) => {
                    const mediaType = types[index];

                    return mediaType === "image/jpeg" ? (
                      <Image
                        key={index}
                        src={el}
                        width={1000}
                        height={1000}
                        alt="user post"
                        className="object-cover object-center w-full h-[500px]"
                      />
                    ) : (
                      <video
                        key={el.id}
                        src={el.media}
                        className="object-cover object-center w-full h-full"
                        controls
                      />
                    );
                  })}
                </figure>
              )}
              {media.length === 2 && (
                <figure className="w-full relative" onClick={showFullPost}>
                  {(media as MediaPost[]).map((el: any, index) => {
                    const mediaType = types[index];

                    return mediaType === "image/jpeg" ? (
                      <Image
                        key={index}
                        src={el}
                        width={1000}
                        height={1000}
                        alt="user post"
                        className="object-cover object-center w-full h-[500px]"
                      />
                    ) : (
                      <video
                        key={el.id}
                        src={el.media}
                        className="object-cover object-center w-full h-full"
                        controls
                      />
                    );
                  })}
                </figure>
              )}
              {media.length === 3 && (
                <figure className="w-full relative" onClick={showFullPost}>
                  {(media as MediaPost[]).map((el: any, index) => {
                    const mediaType = types[index]; // Assuming types correspond to each media item
                    return mediaType === "image/jpeg" ? (
                      <Image
                        key={index}
                        src={el}
                        width={1000}
                        height={1000}
                        alt="user post"
                        className="object-cover object-center w-full h-[500px]"
                      />
                    ) : (
                      <video
                        key={el.id}
                        src={el.media}
                        className="object-cover object-center w-full h-full"
                        controls
                      />
                    );
                  })}
                </figure>
              )}

              {media.length === 4 && (
                <FourColumnImgLayout
                  hidePost={hideFullPost}
                  showFullPost={showPostDetials}
                  media={media as MediaPost[]}
                  onClick={showFullPost}
                  postId={id}
                  userId={userId}
                />
              )}
              {media.length > 4 && (
                <MoreThan4ColumnImgLayout
                  hidePost={hideFullPost}
                  showFullPost={showPostDetials}
                  media={media as MediaPost[]}
                  onClick={showFullPost}
                  postId={id}
                  userId={userId}
                />
              )}
            </section>
          )}
        </div>

        <div className="w-full h-[2px] bg-zinc-100 my-5" />

        {/* POST Interactions */}
        <div className="mb-5 flex items-center gap-6">
          <button
            className={`flex flex-col gap-3 relative transition-all ${
              likeCount ? "text-rose-500" : "text-black"
            }`}
            onClick={() => {
              likeChangeHandler();
              setFirstTime(false);
              setShowLikeAnimation((lst: any) => !lst);
              handleLike(allData);
            }}
          >
            <BsFillHeartFill className="text-lg" />

            {!firstTime && (
              <BsFillHeartFill
                className={`text-lg overlay ${
                  showLikeAnimation ? "fadeOut" : "fadeIn"
                }`}
              />
            )}

            <span className="text-[14px] absolute -top-4 left-4 font-[500]">
              {likeCount}
            </span>
          </button>

          <button
            className={`flex flex-col gap-3 relative transition-all hover:text-rose-500 ${
              showComments ? "text-rose-500" : "text-black"
            }`}
            onClick={() => setShowComments((lst) => !lst)}
          >
            <BiSolidMessageAltDetail className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              {comments?.length}
            </span>
          </button>

          <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
            <BiShareAlt className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              0
            </span>
          </button>
        </div>

        {/* <div className='w-full h-[2px] bg-zinc-100 my-5' /> */}

        <AnimatePresence mode="wait">
          {showComments && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* comments box */}
              <ul className="flex flex-col gap-5">
                {(comments as Comment[]).map((el) => (
                  <SingleComment
                    {...el}
                    key={el.id}
                    postId={id}
                    likeChangeHandler={postCommentLikeHandler}
                    newNestedCommentHandler={commentReplyHandler}
                  />
                ))}
              </ul>

              <NewCommentForm CommentHandler={addNewPostComment} allData={allData}
                setUpdateComment={setUpdateComment} />
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
