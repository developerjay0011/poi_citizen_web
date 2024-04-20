import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { Sendnoti } from "../notification/notification";

export const fetchFollowLeader = async (postBody: any,) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.FollowLeader, postBody);
      if (res?.data?.success) {
        Sendnoti({
          tokens: res.data?.data?.tokens,
          description: res.data?.data?.notification?.description,
          date: res.data?.data?.notification?.createddate,
          title: res.data?.data?.notification?.title,
          userimg: res.data?.data?.notification?.userimg,
          referenceid: res.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "follow_leader"
        })
      }
      return res.data;
    }
  );
};

export const fetchUnFollowLeader = async (postBody: any,) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.UnFollowLeader, postBody);
      if (res?.data?.success) {
        Sendnoti({
          tokens: res.data?.data?.tokens,
          description: res.data?.data?.notification?.description,
          date: res.data?.data?.notification?.createddate,
          title: res.data?.data?.notification?.title,
          userimg: res.data?.data?.notification?.userimg,
          referenceid: res.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "unfollow_leader"
        })
      }
      return res.data;
    }
  );
};


export const fetchCitizenFollowingList = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.CitizenFollowingList, { citizenid }));
      return res.data
    }
  );
};


