import { ErrObj, RequestComplaintDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RequestState {
  requests: RequestComplaintDetails[]
  submitting: boolean
  err: ErrObj
}

const init: RequestState = {
  requests: [],
  submitting: false,
  err: { errTxt: '', isErr: false },
}

export const requestSlice = createSlice({
  name: 'citizenRequest',
  initialState: init,
  reducers: {
    storeRequest(state, action: PayloadAction<RequestComplaintDetails[]>) {
      state.requests = action.payload
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload
    },
    setError(state, action: PayloadAction<ErrObj>) {
      state.err = action.payload
    },
  },
})

export const requestActions = requestSlice.actions
