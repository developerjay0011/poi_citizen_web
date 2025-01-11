import { ErrObj, RequestComplaintDetails, LeaderDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ComplaintState {
  complaints: RequestComplaintDetails[]
  submitting: boolean
  err: ErrObj
  leaderlist: LeaderDetails[]
}

const init: ComplaintState = {
  complaints: [],
  submitting: false,
  err: { errTxt: '', isErr: false },
  leaderlist: []
}

export const complaintSlice = createSlice({
  name: 'citizenComplaint',
  initialState: init,
  reducers: {
    storeComplaints(state, action: PayloadAction<RequestComplaintDetails[]>) {
      state.complaints = Array.isArray(action.payload) ? action.payload : []
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload
    },
    setLeader(state, action: PayloadAction<LeaderDetails[]>) {
      state.leaderlist = Array.isArray(action.payload) ? action.payload : []
    },
    setError(state, action: PayloadAction<ErrObj>) {
      state.err = action.payload
    },

  },
})

export const complaintActions = complaintSlice.actions
