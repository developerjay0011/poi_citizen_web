import { AppDispatch } from '@/redux_store'
import { RequestComplaintData } from '@/utils/typesUtils'
import { ConnectToAPI } from '@/utils/utility'
import { suggestionActions } from './suggestionSlice'
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












const REQUEST_ENDPOINT = 'suggestions'

export const fetchAllSuggestions = () => async (dispatch: AppDispatch) => {
  try {
    const body = JSON.stringify({
      eventID: '0002',
      addInfo: {
        userId: 'be2763ebd37d3de2332e32e24ce2qe321',
      },
    })

    const response = await ConnectToAPI(REQUEST_ENDPOINT, body)

    dispatch(suggestionActions.storeComplaints(response.suggestionList))
  } catch (err) {
    console.error(err)
  }
}

export const addNewSuggestions =
  (complaint: RequestComplaintData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(suggestionActions.setError({ errTxt: '', isErr: false }))
      dispatch(suggestionActions.setSubmitting(true))
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...complaint,
          userId: 'be2763ebd37d3de2332e32e24ce2qe321',
        },
      })

      await ConnectToAPI(REQUEST_ENDPOINT, body)

      dispatch(suggestionActions.setSubmitting(false))
      dispatch(fetchAllSuggestions())
    } catch (err: any) {
      console.error(err.message)
      dispatch(suggestionActions.setError({ errTxt: err.message, isErr: true }))
      dispatch(suggestionActions.setSubmitting(false))
    }
  }

export const deleteSuggestion =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(suggestionActions.setError({ errTxt: '', isErr: false }))
      dispatch(suggestionActions.setSubmitting(true))
      const body = JSON.stringify({
        eventID: '0003',
        addInfo: {
          id,
        },
      })

      await ConnectToAPI(REQUEST_ENDPOINT, body)

      dispatch(fetchAllSuggestions())
      dispatch(suggestionActions.setSubmitting(false))
    } catch (err: any) {
      console.error(err)
      dispatch(suggestionActions.setError({ errTxt: err.message, isErr: true }))
      dispatch(suggestionActions.setSubmitting(false))
    }
  }
