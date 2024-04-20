import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { MapFcm, Sendnoti } from "../notification/notification";

export const GetRaisedComplaints = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetRaisedComplaints, { citizenid }));
      if (res?.data?.success) {
        Sendnoti({
          tokens: MapFcm(res.data?.data?.tokens),
          description: res.data?.data?.notification?.description,
          date: res.data?.data?.notification?.createddate,
          title: res.data?.data?.notification?.title,
          userimg: res.data?.data?.notification?.userimg,
          referenceid: res.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "new_letter"
        })
      }
      return res.data;
    }
  );
};
export const getLeaderList = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getLeaderList, { citizenid }));
      return res.data;
    }
  );
};


export const RaiseComplaint = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.RaiseComplaint, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}

export const DeleteComplaint = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.DeleteComplaint, { citizenid }));
      return res.data;
    }
  );
};


export const ThumbsDown = async (body: any, isup: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post((isup ? APIRoutes.ThumbsUp : APIRoutes.ThumbsDown), body);
      if (res?.data?.success) {
        Sendnoti({
          tokens: MapFcm(res.data?.data?.tokens),
          description: res.data?.data?.notification?.description,
          date: res.data?.data?.notification?.createddate,
          title: res.data?.data?.notification?.title,
          userimg: res.data?.data?.notification?.userimg,
          referenceid: res.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "thumbs_down"
        })
      }
      return res.data;
    }
  );
};


export const ReminderStatus = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.ReminderStatus, body);
      if (res?.data?.success) {
        Sendnoti({
          tokens: MapFcm(res.data?.data?.tokens),
          description: res.data?.data?.notification?.description,
          date: res.data?.data?.notification?.createddate,
          title: res.data?.data?.notification?.title,
          userimg: res.data?.data?.notification?.userimg,
          referenceid: res.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "letter_reminder"
        })
      }
      return res.data;
    }
  );
};



