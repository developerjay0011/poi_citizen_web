import { tryCatch } from '@/config/try-catch';
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { APIRoutes } from '@/constants/routes';


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





