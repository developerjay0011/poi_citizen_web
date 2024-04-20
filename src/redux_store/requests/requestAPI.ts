import { tryCatch } from '@/config/try-catch';
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { APIRoutes } from '@/constants/routes';
import { MapFcm, Sendnoti } from '../notification/notification';


export const GetRaisedRequests = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetRaisedRequests, { citizenid }));
      return res.data;
    }
  );
};

export const RaiseRequest = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.RaiseRequest, resBody)
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
  });
};

export const DeleteRequest = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.DeleteRequest, { citizenid }));
      return res.data;
    }
  );
};





