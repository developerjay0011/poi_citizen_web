import { tryCatch } from '@/config/try-catch';
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { APIRoutes } from '@/constants/routes';



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
