import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { postActions } from "./postSlice";

export const AddPost = async (formData: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.AddPost, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  });
};

export const GetPostsForCitizen = async (citizenid: string) => {
  return tryCatch(async () => {
    const res = await Axios.get(
      insertVariables(APIRoutes.GetPostsForCitizen, { citizenid })
    );
    return res.data;
  });
};

export const DeletePost = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.DeletePost, resBody);
    return res.data;
  });
};

export const LikePost = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikePost, likeBody);
    return res.data;
  });
};

export const UnlikePostorStory = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnlikePostorStory, UnlikeBody);
    return res.data;
  });
};

export const CommentPost = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.CommentPost, resBody);
    return res.data;
  });
};
