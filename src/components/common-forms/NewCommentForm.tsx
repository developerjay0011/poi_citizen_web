"use client";
import { cusSelector } from "@/redux_store/cusHooks";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { fetchCommentPost } from "../api/posts";
import { CommentPost } from "@/redux_store/post/postApi";
import { getImageUrl } from "@/config/get-image-url";

interface NewCommentFormProps {
  CommentHandler: (comment: string) => void;
  allData: any;
  setUpdateComment: any;
}


export const NewCommentForm: FC<NewCommentFormProps> = ({
  CommentHandler,
  allData,
  setUpdateComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const { userDetails } = cusSelector((st) => st.auth);
  const addNewCommentHandler = async (e: FormEvent) => {
    e.preventDefault();
    const mediaId = allData.posts
      .flatMap((m: any) => m.media.map((id: any) => id?.id))
      .flat();
    const postid = allData.posts.map((m: any) => m.id).flat();
    const commentBody = {
      postid: postid[0],
      post_leaderid: allData?.leaderid,
      userid: userDetails.id,
      mediaid: mediaId[0],
      usertype: "citizen",
      username: userDetails?.username,
      userimg: userDetails?.image || "",
      comment_text: commentText,
    };
    try {
      const data = await CommentPost(commentBody);
      if (data?.success) {
        setUpdateComment(data);
      }
    } catch (error) {
      console.log(error);
    }
    if (commentText.length === 0) return;
    CommentHandler(commentText);
    setCommentText("");
  };

  return (
    <>
      <form
        className="flex items-start py-4 gap-5 mt-2 mb-1 relative max-[400px]:gap-3"
        onSubmit={addNewCommentHandler}
      >
        <Image
          alt="user dp"
          src={getImageUrl(userDetails?.image)}
          width={1000}
          height={1000}
          className="w-10 aspect-square rounded-full object-center object-cover"
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={5}
          placeholder="share your thoughts"
          className="bg-zinc-100 p-3 outline-none flex-1 resize-none rounded-md placeholder:capitalize"
        ></textarea>

        <button type="submit" className="absolute top-10 right-2">
          <BiRightArrow />
        </button>
      </form>
    </>
  );
};
