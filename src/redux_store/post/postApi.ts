import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import moment from "moment";
import { getImageUrl } from "@/config/get-image-url";
import { Sendnoti } from "../notification/notification";

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
    console.log("citizenid", citizenid)
    const res = await Axios.get(insertVariables(APIRoutes.GetPostsForCitizen, { citizenid }));
    var data = Array.isArray(res.data) ? res.data : [];
    return ConvertCommonpost(data as any);
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
    if (res?.data.success) {
      Sendnoti({
        tokens: res.data?.data?.tokens,
        description: res.data?.data?.notification?.description,
        date: res.data?.data?.notification?.createddate,
        title: res.data?.data?.notification?.title,
        userimg: res.data?.data?.notification?.userimg,
        referenceid: res.data?.data?.notification?.referenceid,
        notificationid: res?.data?.data?.notification?.id,
        type: "like_post"
      })
    }
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
    if (res?.data.success) {
      Sendnoti({
        tokens: res.data?.data?.tokens,
        description: res.data?.data?.notification?.description,
        date: res.data?.data?.notification?.createddate,
        title: res.data?.data?.notification?.title,
        userimg: res.data?.data?.notification?.userimg,
        referenceid: res.data?.data?.notification?.referenceid,
        notificationid: res?.data?.data?.notification?.id,
        type: "comment_post"
      })
    }
    return res.data;
  });
};



export const GetStoriesForCitizen = async (citizenid: string) => {
  return tryCatch(
    async () => {
      var setdata = []
      const res = await Axios.get(insertVariables(APIRoutes.GetStoriesForCitizen, { citizenid }));
      if (res?.data?.length > 0) {
        setdata = res?.data.map((item: any, index: number) => ({
          name: item.name,
          leaderid: item.leaderid,
          image: item.image,
          index: index,
          media: setmidea(item.posts, { heading: item.name, profileImage: getImageUrl(item.image) }),
        }));
      }
      return setdata;
    }
  );
};

const setmidea = (posts: any[], heading: { heading: string; profileImage: string }) => {
  const postdata = posts.flatMap((element) =>
    element.media?.map((media: any) => ({
      postid: element.id,
      url: getImageUrl(media.media),
      duration: 5000,
      type: media.type?.includes("image") ? "image" : "video",
      header: {
        ...heading,
        subheading: element.written_text,
      },
    }))
  );

  return postdata || [];
};


const ConvertCommonpost = (list = []): any => {
  var combinedData = [] as any;
  try {
    list?.forEach((userData: any) => {
      var userdetails = { ...userData, developments: [], post: [], agendas: [], polls: [], }
      if (userData?.posts) {
        userData?.posts.forEach((post: any) => {
          combinedData.push({
            post: {
              ...post,
              createddate: post?.createddate
            },
            type: "post",
            userdetails: userdetails,
          });
        });
      }
      if (userData?.agendas) {
        userData?.agendas.forEach((post: any) => {
          combinedData.push({
            post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD HH:mm:ss") },
            type: "agendas",
            userdetails: userdetails,
          });
        });
      }
      if (userData?.developments) {
        userData?.developments.forEach((post: any) => {
          combinedData.push({
            type: "developments",
            post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD HH:mm:ss") },
            userdetails: userdetails,
          });
        });
      }
      if (userData?.polls) {
        userData?.polls.forEach((post: any) => {
          combinedData.push({
            type: "polls",
            post: { ...post, createddate: post?.publish_date },
            userdetails: userdetails,
          });
        });
      }
      if (userData?.admin_polls) {
        userData?.admin_polls.forEach((post: any) => {
          combinedData.push({
            type: "polls",
            post: {
              ...post,
              createddate: post?.publish_date
            },
            userdetails: userdetails,
          });
        });
      }
    });
    combinedData.sort((a: any, b: any) => {
      const dateA = new Date(a.post.createddate);
      const dateB = new Date(b.post.createddate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error(error)
  }
  return Array.isArray(combinedData) && combinedData;
};


export const VoteAdd = async (VoteAddBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.AddVoteOfPOll, VoteAddBody);
    return res.data;
  });
};

export const LikeComment = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikeComment, likeBody);
    return res.data;
  });
};

export const UnLikeComment = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnLikeComment, UnlikeBody);
    return res.data;
  });
};

export const ReplyToComment = async (comment: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.ReplyToComment, comment);
    return res.data;
  });
};
