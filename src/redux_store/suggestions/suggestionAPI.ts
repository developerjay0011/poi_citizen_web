import { tryCatch } from '@/config/try-catch';
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { APIRoutes } from '@/constants/routes';
import { MapFcm, Sendnoti } from '../notification/notification';



export const GetSuggestions = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetSuggestions, { citizenid }));
      return res.data;
    }
  );
};

export const SaveSuggestion = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveSuggestion, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
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
}

export const DeleteSuggestion = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.DeleteSuggestion, { citizenid }));
      return res.data;
    }
  );
};
