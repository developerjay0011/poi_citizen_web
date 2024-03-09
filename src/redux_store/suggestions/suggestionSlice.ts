import { ErrObj, RequestComplaintDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SuggestionState {
  suggestions: RequestComplaintDetails[]
  submitting: boolean
  err: ErrObj
}

const init: SuggestionState = {
  suggestions: [],
  submitting: false,
  err: { errTxt: '', isErr: false },
}

export const suggestionSlice = createSlice({
  name: 'citizenRequest',
  initialState: init,
  reducers: {
    storeSuggestions(state, action: PayloadAction<RequestComplaintDetails[]>) {
      state.suggestions = action.payload
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload
    },
    setError(state, action: PayloadAction<ErrObj>) {
      state.err = action.payload
    },
  },
})

export const suggestionActions = suggestionSlice.actions
