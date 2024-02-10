"use client";
import { cusSelector } from "@/redux_store/cusHooks";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { fetchCommentPost } from "../api/posts";

interface NewCommentFormProps {
  CommentHandler: (comment: string) => void;
  allData: any;
  setUpdateComment: any;
}

interface UserDetails {
  token: string;
  id: string;
}

export const NewCommentForm: FC<NewCommentFormProps> = ({
  CommentHandler,
  allData,
  setUpdateComment,
}) => {
  const [commentText, setCommentText] = useState("");
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

  console.log(userDetails);
  const userData = cusSelector((st) => st.auth.userDetails);

  console.log(userData);
  console.log(allData);

  const addNewCommentHandler = async (e: FormEvent) => {
    e.preventDefault();

    const mediaId = allData.posts
      .flatMap((m: any) => m.media.map((id: any) => id?.id))
      .flat();

    console.log(mediaId);

    const postid = allData.posts.map((m: any) => m.id).flat();

    console.log(postid);

    const commentBody = {
      postid: postid[0],
      post_leaderid: allData?.leaderid,
      userid: userDetails.id,
      mediaid: mediaId[0],
      usertype: "citizen",
      username: userData?.data?.username,
      userimg: userData?.data?.image || "",
      comment_text: commentText,
    };

    const token = userDetails?.token;

    try {
      const data = await fetchCommentPost(commentBody, token);

      console.log(data);

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
          src={userData?.data?.image || ("" as string)}
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
