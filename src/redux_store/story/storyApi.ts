import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";

export const AddStory = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.AddStory, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}


export const GetStoriesForCitizen = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetStoriesForCitizen, { citizenid }));
      return res.data;
    }
  );
};

export const DeleteStory = async (resBody: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.DeleteStory, resBody)
      return res.data;
    }
  );
};