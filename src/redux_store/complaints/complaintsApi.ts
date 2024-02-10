import { AppDispatch } from '@/redux_store'
import { RequestComplaintData } from '@/utils/typesUtils'
import { ConnectToAPI } from '@/utils/utility'
import { complaintActions } from './complaintSlice'

const COMPLAINT_ENPOINT = 'complaints'

export const fetchAllComplaints = () => async (dispatch: AppDispatch) => {
  try {
    const body = JSON.stringify({
      eventID: '0002',
      addInfo: {
        userId: 'be2763ebd37d3de2332e32e24ce2qe321',
      },
    })

    const response = await ConnectToAPI(COMPLAINT_ENPOINT, body)

    dispatch(complaintActions.storeComplaints(response.requestList))
  } catch (err) {
    console.error(err)
  }
}

export const addNewComplaint =
  (complaint: RequestComplaintData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(complaintActions.setError({ errTxt: '', isErr: false }))
      dispatch(complaintActions.setSubmitting(true))
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...complaint,
          userId: 'be2763ebd37d3de2332e32e24ce2qe321',
        },
      })

      await ConnectToAPI(COMPLAINT_ENPOINT, body)

      dispatch(fetchAllComplaints())
      dispatch(complaintActions.setSubmitting(false))
    } catch (err: any) {
      console.error(err.message)
      dispatch(complaintActions.setError({ errTxt: err.message, isErr: true }))
      dispatch(complaintActions.setSubmitting(false))
    }
  }

export const deleteComplaint =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(complaintActions.setError({ errTxt: '', isErr: false }))
      dispatch(complaintActions.setSubmitting(true))
      const body = JSON.stringify({
        eventID: '0003',
        addInfo: {
          id,
        },
      })

      await ConnectToAPI(COMPLAINT_ENPOINT, body)

      dispatch(fetchAllComplaints())
      dispatch(complaintActions.setSubmitting(false))
    } catch (err: any) {
      console.error(err)
      dispatch(complaintActions.setError({ errTxt: err.message, isErr: true }))
      dispatch(complaintActions.setSubmitting(false))
    }
  }
