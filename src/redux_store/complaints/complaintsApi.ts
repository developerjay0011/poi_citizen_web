import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";

export const GetRaisedComplaints = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetRaisedComplaints, { citizenid }));
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


export const ThumbsDown = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.ThumbsDown, body);
      return res.data;
    }
  );
};