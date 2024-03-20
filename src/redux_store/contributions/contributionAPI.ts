import { ContributionFormFields } from '@/components/citizen/forms/ContributionsForm'
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch';
import { APIRoutes } from '@/constants/routes';

export const GetContributions = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetContributions, { citizenid }));
      return res.data;
    }
  );
};

export const SaveContribution = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveContribution, formData);
      return res.data;
    }
  );
}

export const DeleteContribution = async (contributionid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.DeleteContribution, { contributionid }));
      return res.data;
    }
  );
};


