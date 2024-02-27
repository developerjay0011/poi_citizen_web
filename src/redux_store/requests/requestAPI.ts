import { AppDispatch } from '@/redux_store'
import { RequestComplaintData } from '@/utils/typesUtils'
import { ConnectToAPI } from '@/utils/utility'
import { requestActions } from './requestSlice'
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















const REQUEST_ENDPOINT = 'requests'

export const fetchAllRequests = () => async (dispatch: AppDispatch) => {
  try {
    const body = JSON.stringify({
      eventID: '0002',
      addInfo: {
        userId: 'be2763ebd37d3de2332e32e24ce2qe321',
      },
    })

    const response = await ConnectToAPI(REQUEST_ENDPOINT, body)

    dispatch(requestActions.storeComplaints(response.requestList))
  } catch (err) {
    console.error(err)
  }
}

export const addNewRequest =
  (complaint: RequestComplaintData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestActions.setError({ errTxt: '', isErr: false }))
      dispatch(requestActions.setSubmitting(true))
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...complaint,
          userId: 'be2763ebd37d3de2332e32e24ce2qe321',
        },
      })

      await ConnectToAPI(REQUEST_ENDPOINT, body)

      dispatch(requestActions.setSubmitting(false))
      dispatch(fetchAllRequests())
    } catch (err: any) {
      console.error(err.message)
      dispatch(requestActions.setError({ errTxt: err.message, isErr: true }))
      dispatch(requestActions.setSubmitting(false))
    }
  }

export const deleteRequest = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestActions.setError({ errTxt: '', isErr: false }))
    dispatch(requestActions.setSubmitting(true))
    const body = JSON.stringify({
      eventID: '0003',
      addInfo: {
        id,
      },
    })

    const res = await ConnectToAPI(REQUEST_ENDPOINT, body)
    dispatch(requestActions.setSubmitting(false))
    dispatch(fetchAllRequests())
  } catch (err: any) {
    console.error(err)
    dispatch(requestActions.setError({ errTxt: err.message, isErr: true }))
    dispatch(requestActions.setSubmitting(false))
  }
}
