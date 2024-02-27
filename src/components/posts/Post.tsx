"use client";

import { Comment, Like, MediaPost, PostDetails } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BiGlobe, BiShareAlt, BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillHeartFill, BsThreeDots, BsHeart } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { PostOptions } from "./PostOptions";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { SingleComment } from "./SingleComment";
import { MoreThan4ColumnImgLayout } from "./MoreThan4ColumnLayout";
import { FourColumnImgLayout } from "./FourColumnLayout";
import NoImg from "@/assets/No_image_available.png";
import { RootState } from "@/redux_store";
import { LikePost, UnlikePostorStory, } from "@/redux_store/post/postApi";
import toast from "react-hot-toast";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { BiX } from "react-icons/bi";
import { userImg } from "@/utils/utility";
import { IoIosArrowForward } from "react-icons/io";
interface PostProps extends PostDetails {
  props: any;
  userdetails: any;
  post: any;
  type: any;
  Getpost: () => void;
}

export const Post: FC<PostProps> = ({ writtenText, media, id, comments, likes, userId, createdDatetime, leaderid, types, name, userimages, allData, updatePost, userdetails, post, type, Getpost, ...props }) => {
  const [firstTime, setFirstTime] = useState(true);
  const [showPostDetials, setShowPostDetials] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const { userDetails } = cusSelector((st) => st.auth);
  const showFullPost = () => setShowPostDetials(true);
  const hideFullPost = () => setShowPostDetials(false);
  const likeChangeHandler = () => { };
  const islike = (list: any) => {
    if (Array.isArray(list)) {
      var listlikes = [...list];
      listlikes = listlikes?.filter((item) => item?.userid == userDetails?.id);
      return Array.isArray(listlikes) && listlikes?.length > 0 ? true : false;
    }
    return false;
  };
  const [showLikeAnimation, setShowLikeAnimation] = useState(
    (likes as Like[])?.some((el) => el.userId === userDetails?.id)
  );
  const [curPostIndex, setCurPostIndex] = useState(0);
  const curPost = post?.media?.[curPostIndex]


  useEffect(() => {
    updatePost(updateComment);
    setShowComments(false);
  }, [updateComment]);

  const handleLike = async () => {
    const likeBody = {
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
      usertype: "citizen",
      username: userDetails.username,
      userimg: userDetails.image,
    };
    const UnlikeBody = {
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
    };
    try {
      if (!islike(post?.likes)) {
        const data = await LikePost(likeBody);
        toast.success(data.message);
        Getpost();
      } else {
        const data = await UnlikePostorStory(UnlikeBody);
        toast.success(data.message);
        Getpost();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCommentLikeHandler = (commentId: string) => { };

  const commentReplyHandler = (commentId: string, commentReply: string) => { };

  const addNewPostComment = (comment: string) => { };




  const increasePostCount = () => {
    setCurPostIndex((lst) => {
      if (lst < post?.media.length - 1) return lst + 1;
      else return post?.media.length - 1;
    });
  };
  const decreasePostCount = () => {
    setCurPostIndex((lst) => {
      if (lst > 0) return lst - 1;
      else return 0;
    });
  };




  return (
    <>
      <section className="border rounded-md bg-white px-5">
        {/* User details and Date */}
        <div className="flex items-center gap-3 py-4 text-sky-950 border-b">
          <CustomImage
            src={getImageUrl(userdetails?.image)}
            alt="user pic"
            className="w-12 aspect-square object-cover object-center rounded-full"
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className="font-[600] text-lg text-orange-500">
              {userdetails?.name}
            </h4>
            <p className="flex items-center capitalize gap-2 text-sm font-[500]">
              <BiGlobe />
              <span>
                Published on:{" "}
                {post?.createddate ? dateConverter(post?.createddate) : ""}
              </span>
            </p>
          </div>

          {/* Actions */}
          {/* <div className="ml-auto relative" id="moreOptions">
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
          </div> */}
        </div>

        {/* USER POST */}
        <div className="flex flex-col gap-5 mt-5">
          {/* TEXT POST */}
          <p className="text-[16px]">{writtenText}</p>

          {/* MEDIA */}
          {post?.media?.length > 0 && (
            <section className="w-full">
              <figure className="w-full relative" onClick={showFullPost}>
                {/* {(post?.media as MediaPost[]).map((el: any, index) => {
                  return index < 2 && (el?.type === "image/jpeg" ? (
                    <Image
                      key={index}
                      src={getImageUrl(el?.media)}
                      width={1000}
                      height={1000}
                      style={{ objectFit: "contain" }}
                      alt="user post"
                      className="object-cover object-center w-full h-[500px]"
                    />
                  ) : (
                    <video
                      key={index}
                      src={getImageUrl(el?.media)}
                      className="object-cover object-center w-full h-full"
                      controls
                    />
                  )
                  )
                })} */}




                {/* <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <m.section
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="bg-gray-600 bg-opacity-90 w-[1150px] m-auto flex z-[60] relative shadow-md mt-10 rounded-md overflow-hidden h-[601px] max-[1150px]:flex-col max-[1150px]:w-full max-[1150px]:mt-0 max-[1150px]:h-full"
                  > */}

                <div >
                  {curPostIndex !== 0 && (
                    <button
                      type="button"
                      onClick={decreasePostCount}
                      className="absolute top-1/2 translate-y-[-50%] left-3 rounded-full bg-orange-400 text-black aspect-square flex items-center justify-center p-1"
                    >
                      <IoIosArrowForward className="text-4xl rotate-180" />
                    </button>
                  )}

                  <div className="w-full h-full p-10 overflow-hidden">
                    {curPost.type?.startsWith("image") && (
                      <Image
                        src={getImageUrl(curPost.media)}
                        alt={`post ${curPostIndex}`}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover object-center"
                      />
                    )}
                    {curPost.type.startsWith("video") && (
                      <video
                        src={getImageUrl(curPost.media)}
                        width={1000}
                        height={1000}
                        className="w-full h-auto max-[1150px]:w-full max-[1150px]:h-full max-[1150px]:object-cover max-[1150px]:object-center"
                        controls
                      />
                    )}
                  </div>

                  {curPostIndex !== post?.media.length - 1 && (
                    <button
                      type="button"
                      onClick={increasePostCount}
                      className="absolute top-1/2 translate-y-[-50%] right-3 rounded-full bg-orange-400 text-black aspect-square flex items-center justify-center p-1"
                    >
                      <IoIosArrowForward className="text-4xl" />
                    </button>
                  )}
                </div>
                {/* </m.section>
                </m.div> */}
              </figure>
              {/* {post?.media?.length > 2 && (
                <MoreThan4ColumnImgLayout
                  hidePost={hideFullPost}
                  showFullPost={showPostDetials}
                  media={post?.media as MediaPost[]}
                  onClick={showFullPost}
                  postId={post?.id}
                  userId={post?.leaderid}
                />
              )} */}
            </section>
          )}
        </div>

        <div className="w-full h-[2px] bg-zinc-100 my-5" />

        {/* POST Interactions */}
        <div className="mb-5 flex items-center gap-6">
          <button
            className={`flex flex-col gap-3 relative transition-all ${post?.likes?.length ? "text-rose-500" : "text-black"}`}
            onClick={() => {
              setFirstTime(false);
              likeChangeHandler();
              setShowLikeAnimation(!islike(post?.likes));
              handleLike();
            }}
          >
            {islike(post?.likes) ? (<BsFillHeartFill className="text-lg" />) : (<BsHeart className="text-lg" />)}
            {!firstTime && (
              <BsFillHeartFill className={`text-lg overlay ${showLikeAnimation ? "fadeOut" : "fadeIn"}`} />
            )}

            <span className="text-[14px] absolute -top-4 left-4 font-[500]">
              {post?.likes?.length}
            </span>
          </button>
          <button
            className={`flex flex-col gap-3 relative transition-all hover:text-rose-500 ${showComments ? "text-rose-500" : "text-black"}`}
            onClick={() => setShowComments((lst) => !lst)}
          >
            <BiSolidMessageAltDetail className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              {post?.comments?.length}
            </span>
          </button>
          <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
            <BiShareAlt className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              0
            </span>
          </button>
        </div>
        <AnimatePresence mode="wait">
          {showComments && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ul className="flex flex-col gap-5">
                {(post?.comments as Comment[]).map((el, index) => (
                  <SingleComment
                    {...el}
                    key={index}
                    postId={id}
                    likeChangeHandler={postCommentLikeHandler}
                    newNestedCommentHandler={commentReplyHandler}
                  />
                ))}
              </ul>
              <NewCommentForm
                CommentHandler={addNewPostComment}
                allData={allData}
                setUpdateComment={setUpdateComment}
              />
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
