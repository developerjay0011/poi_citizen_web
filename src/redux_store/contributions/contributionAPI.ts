import { ContributionFormFields } from '@/components/citizen/forms/ContributionsForm'
import Axios from '@/config/axios';
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch';
import { APIRoutes } from '@/constants/routes';
import { AppDispatch } from '@/redux_store'
import { ConnectToAPI } from '@/utils/utility'

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
      const res = await Axios.post(APIRoutes.SaveContribution, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}

export const DeleteContribution = async (citizenid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.DeleteContribution, { citizenid }));
      return res.data;
    }
  );
};



export const addNewContribution =
  (contribution: ContributionFormFields) => async (dispatch: AppDispatch) => {
    try {
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...contribution,
          userId: 'be2763ebd37d3de2332e32e24ce2qe321',
        },
      })
      const res = await ConnectToAPI('contributions', body)
    } catch (err) {
      console.error(err)
    }
  }
