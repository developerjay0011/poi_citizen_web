"use client";
import { Comment, Like, PostDetails } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BiGlobe, BiShareAlt, BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillHeartFill, BsThreeDots, BsHeart } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { cusSelector } from "@/redux_store/cusHooks";
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { SingleComment } from "./SingleComment";
import { LikePost, UnlikePostorStory, } from "@/redux_store/post/postApi";
import toast from "react-hot-toast";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import PostGrid from "../PostGrid";
import { Shortlistbytime, islike } from "./utils";


interface PostProps extends PostDetails {
  props: any;
  userdetails: any;
  post: any;
  type: any;
  Getpost: () => void;
  index: string,
  allData: any
}

export const Post: FC<PostProps> = ({ userdetails, post, Getpost, index, allData, }) => {
  const [firstTime, setFirstTime] = useState(true);
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
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
      usertype: "citizen",
      username: userDetails?.username,
      userimg: userDetails?.image,
    };
    const UnlikeBody = {
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
    };
    try {
      if (!is_like) {
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
                deletePostHandler={() => deletePostHandler(leaderid, id)}
                userId={userId}
                onClose={() => setShowMorePostOptions(false)}
              />
            )}
        </div> */}
      </div>

      {/* Post */}
      <div className="flex flex-col gap-5 mt-5">
        {post?.media?.length > 0 && <PostGrid imagesOrVideos={post?.media?.map((item: any) => getImageUrl(item?.media)) as []} />}
        <p className="text-[16px]">{post?.written_text}</p>
      </div>
      <div className="w-full h-[2px] bg-zinc-100 my-6" />

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



      {/* Commnets */}
      <AnimatePresence mode="wait">
        {showComments && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul className="flex flex-col gap-5">
              {(Shortlistbytime(post?.comments) as Comment[]).map((el, index) => (
                <SingleComment
                  {...el}
                  comments={el}
                  key={index}
                  likeChangeHandler={() => Getpost()}
                  newNestedCommentHandler={() => Getpost()}
                  post={post}
                />
              ))}
            </ul>
            <NewCommentForm
              CommentHandler={() => Getpost()}
              allData={allData}
            />
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
